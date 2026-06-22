import { useNavigate } from "react-router-dom";
import logo from "../assets/expense-logo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br
    from-emerald-600 via-green-500 to-lime-400 flex items-center justify-center px-4">

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Expense Tracker"
            className="w-60 h-60 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Expense Tracker
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg mb-10">
          Track your expenses smartly and easily
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white text-lg font-semibold shadow-md hover:bg-emerald-700 hover:shadow-lg transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full py-3 rounded-xl border-2 border-emerald-600 text-emerald-600 text-lg font-semibold hover:bg-emerald-50 transition"
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;