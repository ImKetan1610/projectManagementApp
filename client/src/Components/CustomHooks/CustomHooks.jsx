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
      if (error instanceof Error) return error.response.data.message;
      else return error;
    }
  }

  async function createTask(taskData) {
    try {
      const res = await apiClient.post(`/api/tasks`, taskData);
      if (res.status === 201) {
        return res.data;
      } else {
        throw new Error("Failed to create task.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }

  /***** Task *****/
  async function getUsersTasks(req, res) {
    try {
      const res = await apiClient.get(`/api/tasks`);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Failed to retrieve tasks.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }

  return { updateProfile, createTask, getUsersTasks };
}

export default customHooks;
