import { useEffect, useState } from "react";
import SummaryCard from "../../../components/summary/SummaryCard";
import CategoryTable from "../../../components/summary/CategoryTable";
import { getCurrentMonthSummary } from "../../../services/expenseService";
import { useSelector } from "react-redux";

const CurrentMonthlySummary = () => {
  const [total, setTotal] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
    const token=useSelector((state)=>state.AuthReducer.token);
    const username=useSelector((state)=>state.AuthReducer.username);



  // month & year for subtitle
  const monthYear = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {

    console.log("Username from token:", username);

    if (username) {
      fetchCurrentMonthSummary(username);
    }
  }, []);

  const fetchCurrentMonthSummary = async (username) => {
  try {
    setLoading(true);

    const response = await getCurrentMonthSummary(username,token);
    console.log("API RESPONSE:", response);

    setTotal(response.data.totalSpend ?? 0);
    console.log("set total to ",response.data.totalSpend);

    // Convert object -> array for table


    setCategoryData(response.data.categoryWiseSpend || {});
  } catch (err) {
    console.error("Error fetching current month summary", err);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <SummaryCard title="Current Month Summary">
        <p className="text-gray-500">Loading...</p>
      </SummaryCard>
    );
  }

  return (
    <SummaryCard
      title="Current Month Summary"
      subtitle={monthYear}
    >
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
    </SummaryCard>
  );
};

export default CurrentMonthlySummary;