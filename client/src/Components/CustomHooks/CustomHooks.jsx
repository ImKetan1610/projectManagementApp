import axios from "axios";
import { BACKEND_URL } from "../../utils/constant.js";

function customHooks() {
  const apiClient = axios.create({
    baseURL: BACKEND_URL,
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("proManage");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.rejects(error);
    }
  );

  async function updateProfile(data) {
    try {
      const res = await apiClient.put(`/api/users/update-profile`, data);
      if (res.status == 200) {
        return res.data;
      } else {
        throw new Error("Server error while updating the profile.");
      }
    } catch (error) {
      if (error instanceof Error) return error.response.data.message
      else return error
    }
  }

  return { updateProfile };
}

export default customHooks;
