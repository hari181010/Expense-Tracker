import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/authService";
import { useDispatch } from "react-redux";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
    dispatch({
      type:"SET_AUTH",
      data:{
        token:res.data.token,
        username:username,
      },
    });

    toast.success("Login successful!");

    // small delay so toast is visible
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
        >
          Login
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 w-full border py-2 rounded"
        >
          ← Back
        </button>
      </form>
    </div>
  );
}