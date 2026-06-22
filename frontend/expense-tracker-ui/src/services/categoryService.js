import axios from "axios";

const API_URL = "http://localhost:8080/category";

export const getAllCategories = async (token) => {
  return axios.get(`${API_URL}/getAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};