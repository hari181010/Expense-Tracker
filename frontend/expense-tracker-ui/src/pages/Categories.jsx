import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../services/categoryService";
import { useSelector } from "react-redux";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const token=useSelector((state)=>state.AuthReducer.token);


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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-500 to-lime-400 p-6">

      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Categories
        </h2>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500">
            No categories found
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Category Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.categoryId} className="border-b">
                  <td className="p-3">{cat.categoryId}</td>
                  <td className="p-3">{cat.categoryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full border border-green-700 text-green-700 py-2 rounded-xl hover:bg-green-50"
        >
          ← Back
        </button>

      </div>
    </div>
  );
}