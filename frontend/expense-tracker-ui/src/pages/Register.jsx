import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role:""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, phone, username, password, role } = form;

    if (!name || !email || !phone || !username || !password || !role) {
      toast.warn("Please fill all fields");
      return;
    }

    if (role !== "admin" && role !== "user") {
      toast.error("Role must be 'admin' or 'user'");
      return;
    }

    try {
      const response = await api.post("/register", form);

      if (response.status === 201 || response.status===200) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error("Registration failed");
      }

    } catch (error) {
      console.log("AXIOS ERROR FULL:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("HEADERS:", error.response?.headers);

      toast.error("Server error. Try again later");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-500 to-lime-400 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Register
        </h1>

        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        {/* Phone */}
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        {/* Username */}
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        {/* Role */}
        {/* Role */}
        <input
          name="role"
          placeholder="Role (admin or user)"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
        />

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition mb-4"
        >
          Register
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full border-2 border-emerald-600 text-emerald-600 py-3
          rounded-xl font-semibold hover:bg-emerald-50 transition"
        >
          ← Back
        </button>

      </div>
    </div>
  );
}

export default Register;