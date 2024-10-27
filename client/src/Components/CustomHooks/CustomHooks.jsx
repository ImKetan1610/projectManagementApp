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

  
}

export default customHooks;
