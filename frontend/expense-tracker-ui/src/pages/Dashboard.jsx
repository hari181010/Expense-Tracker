import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExpensesByUser } from "../services/expenseService";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  const YEARLY_INCOME = 4000000;

  const username = useSelector((state) => state.AuthReducer.username);
  const token = useSelector((state) => state.AuthReducer.token);

  useEffect(() => {
    if (!username) return;

    getExpensesByUser(username, token)
      .then((res) => {
        setExpenses(res.data);
        const total = res.data.reduce(
          (sum, exp) => sum + exp.amount,
          0
        );
        setTotalSpent(total);
      })
      .catch((err) => console.error(err));
  }, [username]);

  // IN Indian Rupee formatter
  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  return (
    <div className="min-h-screen bg-green-600 px-8 py-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-green-100 mt-1">
            Welcome back, {username}
          </p>
        </div>

        <button
          onClick={() => {
            dispatch({ type: "CLEAR_AUTH" });
            toast.success("Logout successful");
            navigate("/login");
          }}
          className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <StatCard
          title="Total Spent (This Year)"
          value={formatINR(totalSpent)}
          accent="text-red-600"
        />

        <StatCard
          title="Remaining Balance"
          value={formatINR(YEARLY_INCOME - totalSpent)}
          accent="text-green-700"
        />

        <StatCard
          title="Total Expenses"
          value={expenses.length}
          accent="text-blue-700"
        />

      </div>

      {/* ================= MAIN ACTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">



        {/* ACCOUNT */}
        <ActionCard
          title="Account"
          desc="Manage your account details"
        >
          <PrimaryBtn onClick={() => navigate("/account/view")}>
            View Account
          </PrimaryBtn>
        </ActionCard>

        {/* CATEGORIES */}
        <ActionCard
          title="Categories"
          desc="View expense categories"
        >
          <PrimaryBtn onClick={() => navigate("/dashboard/categories")}>
            View Categories
          </PrimaryBtn>
        </ActionCard>



        {/* EXPENSES */}
        <ActionCard
          title="Expenses"
          desc="Track and analyze your spending"
        >
          <PrimaryBtn onClick={() => navigate("/dashboard/expenses")}>
            View Expenses
          </PrimaryBtn>
          <SecondaryBtn onClick={() => navigate("/dashboard/expenses/add")}>
            + Add Expense
          </SecondaryBtn>
          <SecondaryBtn onClick={() => navigate("/dashboard/expenses/summary")}>
            Summary
          </SecondaryBtn>
        </ActionCard>

      </div>

      {/* CHILD ROUTES */}
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, accent }) => (
  <div className="bg-white rounded-xl px-6 py-5 shadow-md">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <h2 className={`text-2xl font-semibold ${accent}`}>
      {value}
    </h2>
  </div>
);

const ActionCard = ({ title, desc, children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{desc}</p>
    </div>
    <div className="flex flex-col gap-3">
      {children}
    </div>
  </div>
);

const PrimaryBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2.5 rounded-md"
  >
    {children}
  </button>
);

const SecondaryBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="border border-green-600 text-green-700 hover:bg-green-50 transition px-4 py-2.5 rounded-md"
  >
    {children}
  </button>
);