import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getExpensesByUser, deleteExpenseById } from "../services/expenseService";
import { useSelector } from "react-redux";

export default function Expenses() {
  const navigate = useNavigate();
  const [openMonths,setOpenMonths]=useState({});

  const [originalExpenses, setOriginalExpenses] = useState([]);
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [categoryQuery, setCategoryQuery] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const username=useSelector((state)=>state.AuthReducer.username);
    const token=useSelector((state)=>state.AuthReducer.token);



  useEffect(() => {
    fetchExpenses();
  }, []);

  // 🟦 Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await getExpensesByUser(username, token);

      // 🟩 NO year filter -> get ALL expenses
      const prepared = res.data.sort(
        (a, b) => new Date(b.expenseDate) - new Date(a.expenseDate)
      );

      setOriginalExpenses(prepared);
      applyFilters(prepared);
    } catch (err) {
      console.error(err);
    }
  };

  // 🟦 Apply category + amount filters
  const applyFilters = (data) => {
    const filtered = data.filter(e => {
      const categoryMatch = e.category.categoryName
        .toLowerCase()
        .includes(categoryQuery.toLowerCase());

      const minMatch =
        minAmount === "" || e.amount >= Number(minAmount);

      const maxMatch =
        maxAmount === "" || e.amount <= Number(maxAmount);

      return categoryMatch && minMatch && maxMatch;
    });

    groupByMonth(filtered);
  };

  // 🟦 Group by month + calculate monthly total
  const groupByMonth = (data) => {
    const grouped = {};

    data.forEach(exp => {
      const d = new Date(exp.expenseDate);
      const monthKey = d.toLocaleString("default", {
        month: "long",
        year: "numeric"
      });

      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          total: 0,
          items: []
        };
      }

      grouped[monthKey].items.push(exp);
      grouped[monthKey].total += exp.amount;
    });

    setGroupedExpenses(grouped);
  };

  const handleDelete = async (expenseId) => {
    try {
      await deleteExpenseById(expenseId, username,token);

      // 🟩 remove from BASE list
      const updated = originalExpenses.filter(
        e => e.expenseId !== expenseId
      );

      setOriginalExpenses(updated);

      // re-apply filters + regroup
      applyFilters(updated);

      toast.success("Expense deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete expense");
    }
  };

  const toggleMonth = (month) => {
    setOpenMonths(prev => {
      const isOpen = prev[month] ?? true; // default OPEN
      return {
        ...prev,
        [month]: !isOpen
      };
    });
  };

  // 🟦 Re-apply filters when search changes
  useEffect(() => {
    applyFilters(originalExpenses);
  }, [categoryQuery, minAmount, maxAmount]);

  return (
    <div className="page-container">
      <h2 className="page-title">Expenses</h2>

      <button className="btn-back" onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

      {/* 🔍 SEARCH */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search category"
          value={categoryQuery}
          onChange={e => setCategoryQuery(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min ₹"
          value={minAmount}
          onChange={e => setMinAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max ₹"
          value={maxAmount}
          onChange={e => setMaxAmount(e.target.value)}
        />
      </div>

      {/* 🟦 MONTHLY GROUPS */}
      {Object.keys(groupedExpenses).length === 0 ? (
        <p>No expenses found</p>
      ) : (
        Object.keys(groupedExpenses).map(month => (
          <div key={month} className="month-section">
            <h3
              className="month-header"
              onClick={() => toggleMonth(month)}
              style={{ cursor: "pointer" }}
            >
              {openMonths[month] === false ? "▶" : "▼"} {month}
              <span className="month-total">
                Total: ₹ {groupedExpenses[month].total}
              </span>
            </h3>

            {openMonths[month]!==false && (
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groupedExpenses[month].items.map(exp => (
                  <tr key={exp.expenseId}>
                    <td>{exp.expenseDate}</td>
                    <td>{exp.category.categoryName}</td>
                    <td>₹ {exp.amount}</td>
                    <td>
                      <button
                        onClick={()=>handleDelete(exp.expenseId)}
                        className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        ))
      )}
    </div>
  );
}