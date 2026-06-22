import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAccountByUsername,
  deleteAccountByUsername,
  updateAccountByUsername
} from "../../services/accountService";

import { clearAuthAction } from "../../redux/authaction";



const ViewAccount = () => {
  const [account, setAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, token } = useSelector(
    (state) => state.AuthReducer
  );

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    try {
      const res = await getAccountByUsername(username, token);
      setAccount(res.data);
      setFormData({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone
      });
    } catch (err) {
      toast.error("Failed to load account");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      await updateAccountByUsername(username, formData, token);
      toast.success("Account updated successfully");

      setAccount({
        ...account,
        ...formData
      });

      setIsEditing(false);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await deleteAccountByUsername(username, token);
      toast.success("Account deleted successfully");
      dispatch(clearAuthAction());
      navigate("/login");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (!account) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-green-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">My Account</h2>
            <p className="text-sm">View and manage your account details</p>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-green-700 px-4 py-2 rounded hover:bg-green-100"
          >
            Back to Dashboard
          </button>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

          {/* LEFT PROFILE */}
          <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center justify-center">
            <img
              src={`/users/${account.username}.jpg`}
              alt={account.username}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/users/default.jpg";
              }}
              className="w-40 h-40 rounded-full object-cover mb-4 border-2 border-green-600"
            />

            <h3 className="text-lg font-semibold">{account.name}</h3>

            <span className="text-sm bg-green-600 text-white px-3 py-1 rounded-full mt-2">
              {account.role}
            </span>

          </div>

          {/* RIGHT DETAILS */}
          <div className="md:col-span-2 space-y-4">

            <Detail label="Account ID" value={account.accountId} />
            <Detail label="Username" value={account.username} />

            {isEditing ? (
              <>
                <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
                <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
                <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
              </>
            ) : (
              <>
                <Detail label="Name" value={account.name} />
                <Detail label="Email" value={account.email} />
                <Detail label="Phone" value={account.phone} />
              </>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: account.name,
                        email: account.email,
                        phone: account.phone
                      });
                    }}
                    className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

            {/* DANGER ZONE */}
            <div className="border-t pt-6 mt-6">
              <h4 className="text-red-600 font-semibold mb-2">Danger Zone</h4>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------- REUSABLE COMPONENTS ----------- */

const Detail = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <input
      {...props}
      className="w-full p-2 border rounded"
    />
  </div>
);

export default ViewAccount;