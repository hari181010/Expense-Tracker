import axios from "axios";

const BASE_URL = "http://localhost:8080/api/account";

export const getAccountByUsername = (username, token) => {
  return axios.get(`${BASE_URL}/get/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAccountByUsername = (username, token) => {
  return axios.delete(`${BASE_URL}/delete/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAccountByUsername = (username, data, token) => {
  return axios.put(
    `${BASE_URL}/update/${username}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};