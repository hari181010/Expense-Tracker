import { useState } from "react";
import SummaryCard from "../../../components/summary/SummaryCard";
import CategoryTable from "../../../components/summary/CategoryTable";
import { getMonthlySummary } from "../../../services/expenseService";
import { useSelector } from "react-redux";

const MonthlySummary = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [total, setTotal] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [monthName, setMonthName] = useState("");
    const token=useSelector((state)=>state.AuthReducer.token);
    const username=useSelector((state)=>state.AuthReducer.username);



  const fetchMonthlySummary = async () => {
    if (!month || !year) {
      alert("Please select both month and year");
      return;
    }

    try {
      setLoading(true);


      if (!username) return;

      const response =
        await getMonthlySummary(username, month, year,token);

      setTotal(response.data.totalSpend || 0);
      setCategoryData(response.data.categoryWiseSpend || []);

      const name = new Date(year, month - 1).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      setMonthName(name);
    } catch (err) {
      console.error("Error fetching monthly summary", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SummaryCard
      title="Monthly Summary"
      subtitle={monthName || "Select month and year"}
    >
      {/* Dropdowns */}
      <div className="flex gap-3 mb-4">
        <select
          className="border p-2 rounded"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Month</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Year</option>
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button
          onClick={fetchMonthlySummary}
          className="bg-green-600 text-white px-4 rounded"
        >
          View
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-green-600 mb-2">
            Total Spent: ₹{total}
          </h3>

          {Object.keys(categoryData).length > 0 ? (
            <CategoryTable data={categoryData} />
          ) : (
            <p className="text-sm text-gray-400">
              No data available
            </p>
          )}
        </>
      )}
    </SummaryCard>
  );
};

export default MonthlySummary;