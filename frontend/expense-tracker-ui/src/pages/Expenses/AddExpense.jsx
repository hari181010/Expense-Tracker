import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategories } from "../../services/categoryService";
import { addExpense } from "../../services/expenseService";
import { useSelector } from "react-redux";

// ♦ extract username from JWT


export default function AddExpense() {

  const username=useSelector((state)=>state.AuthReducer.username);
  const token=useSelector((state)=>state.AuthReducer.token);
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);



  // ♦ load categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getAllCategories(token);
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  // ♦ submit expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }

    if (!amount || !expenseDate || !categoryId) {
      toast.error("All fields are required");
      return;
    }

    const expenseData = {
      amount: Number(amount),
      expenseDate,
      categoryId: Number(categoryId),
    };

    try {
      await addExpense(username, expenseData,token);
      toast.success("Expense added successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-lime-400 flex items-center justify-center">
      <div className="bg-white w-96 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Expense
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            className="w-full mb-4 p-3 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Date */}
          <input
            type="date"
            className="w-full mb-4 p-3 border rounded"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />

          {/* Category */}
          <select
            className="w-full mb-4 p-3 border rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
          >
            Add Expense
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full mt-3 border py-2 rounded"
          >
            ← Back
          </button>
        </form>
      </div>
    </div>
  );
}