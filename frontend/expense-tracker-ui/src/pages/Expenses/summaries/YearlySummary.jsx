import { useEffect, useState } from "react";
import SummaryCard from "../../../components/summary/SummaryCard";
import CategoryTable from "../../../components/summary/CategoryTable";
import { getYearlySummary } from "../../../services/expenseService";
import { useSelector } from "react-redux";

const YearlySummary = () => {
  const [total, setTotal] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();
    const token=useSelector((state)=>state.AuthReducer.token);
    const username=useSelector((state)=>state.AuthReducer.username);



  useEffect(() => {
    fetchYearlySummary();
  }, []);

  const fetchYearlySummary = async () => {
    try {

      if (!username) return;

      const response = await getYearlySummary(token,username);
      console.log("yearly",response);

      setTotal(response.data.totalSpend || 0);
      setCategoryData(response.data.categoryWiseSpend || {});
    } catch (error) {
      console.error("Error fetching yearly summary", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SummaryCard title="Yearly Summary">
        <p className="text-gray-500">Loading...</p>
      </SummaryCard>
    );
  }

  return (
    <SummaryCard
      title="Yearly Summary"
      subtitle={`Year ${currentYear}`}
    >
      <h3 className="text-2xl font-bold text-green-600 mb-2">
        Total Spent: ₹{total}
      </h3>

      {Object.keys(categoryData).length > 0 ? (
        <CategoryTable data={categoryData} />
      ) : (
        <p className="text-sm text-gray-400">No data available</p>
      )}
    </SummaryCard>
  );
};

export default YearlySummary;