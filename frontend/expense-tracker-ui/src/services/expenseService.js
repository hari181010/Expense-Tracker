import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:8080/api/expense";

// ADD expense (already correct)
export const addExpense = async (username, data, token) => {

  return axios.post(
    `${API_URL}/add?username=${username}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// GET expenses (THIS WAS MISSING)
export const getExpensesByUser = async (username, token) => {
  console.log("getEx", username, token);
  return axios.get(
    `${API_URL}/get/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// DELETE expense
export const deleteExpenseById = async (expenseId, username, token) => {

  return axios.delete(
    `${API_URL}/delete/${expenseId}`,
    {
      params: { username },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// ===== SUMMARY APIS =====

// Current month summary
export const getCurrentMonthSummary = async (username, token) => {

  return axios.get(
    `${API_URL}/summary/current-month?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Monthly summary
export const getMonthlySummary = async (username, month, year, token) => {

  return axios.get(
    `${API_URL}/summary/${year}/${month}?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Yearly summary
export const getYearlySummary = async (token, username, year) => {
  return axios.get(
    `${API_URL}/yearly/summary/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};