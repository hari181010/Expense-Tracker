import axios from "axios";

const API_URL = "http://localhost:8080";

export const login = async (data) => {
  return axios.post(`${API_URL}/generateToken`, data);
};