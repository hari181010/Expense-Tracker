import CurrentMonthlySummary from "./Expenses/summaries/CurrentMonthlySummary";
import MonthlySummary from "./Expenses/summaries/MonthlySummary";
import YearlySummary from "./Expenses/summaries/YearlySummary";
import { useNavigate } from "react-router-dom";
export default function ExpenseSummary() {
  const navigate=useNavigate();
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Expense Summary
      </h2>
      {/* ONE GRID - CONTROLS EVERYTHING */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <CurrentMonthlySummary />
        <MonthlySummary />
        <YearlySummary />
      </div>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded shadow-md"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}