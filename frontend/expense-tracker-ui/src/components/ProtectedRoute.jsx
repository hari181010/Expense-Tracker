import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const token = useSelector((state)=>state.AuthReducer.token);
  // useEffect(()=>{
  //   if (!token) {
  //   toast.error("Please login first");
  //   }

  // },[token]);

  if (!token) {
    return <Navigate to="/login" replace />;
    }

  return children;
}