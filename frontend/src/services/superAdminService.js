import axios from "axios";

const API_URL = "http://localhost:5000/api/superadmin";

export const getPendingRegistrations = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/pending-registrations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
