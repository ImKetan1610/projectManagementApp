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
  async function getUsersTasks() {
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

  async function filterTaskByDueDate(filter) {
    try {
      const res = await apiClient.get(`/api/tasks/filter`, {
        params: { filter },
      });

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Failed to filter tasks by due date.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }

  async function filterTaskByStatus(status, filter) {
    try {
      const userId = localStorage.getItem("proManage:userId"); // Assumes user ID is stored in local storage
      const res = await apiClient.get(`/api/tasks/filterByStatus`, {
        params: { userId, status, filter },
      });

      if (res.status === 200) {
        return res.data; // Successfully retrieved filtered tasks
      } else {
        throw new Error("Failed to filter tasks by status.");
      }
    } catch (error) {
      return error.response?.data?.message || error.message;
    }
  }

  async function updateStatus(taskId, newStatus) {
    try {
      const res = await apiClient.put(`/api/tasks/status/${taskId}`, {
        status: newStatus,
      });

      if (res.status === 200) {
        return res.data; // Successfully updated status
      } else {
        throw new Error("Failed to update task status.");
      }
    } catch (error) {
      return error.response?.data?.message || error.message;
    }
  }

  async function filterByPriority(priority) {
    // Validate priority parameter
    const validPriorities = [
      "Low Priority",
      "Moderate Priority",
      "High Priority",
    ];
    if (!validPriorities.includes(priority)) {
      throw new Error(
        "Invalid priority value. Allowed values: low, moderate, high."
      );
    }

    try {
      const res = await apiClient.get(`/api/tasks/priority/${priority}`);
      if (res.status === 200) {
        return res.data; // Successfully retrieved tasks by priority
      } else {
        throw new Error("Failed to filter tasks by priority.");
      }
    } catch (error) {
      return error.response?.data?.message || error.message;
    }
  }

  async function dueDateTasks() {
    try {
      const res = await apiClient.get(`/api/tasks/dueDateTasks`);
      if (res.status === 200) {
        return res.data; // Successfully retrieved tasks by priority
      } else {
        throw new Error("Failed to filter tasks by priority.");
      }
    } catch (error) {
      return error.response?.data?.message || error.message;
    }
  }

  async function getTaskById(id) {
    console.log("getTaskById", id);
    try {
      const res = await apiClient.get(`/api/tasks/${id}`);
      return res.data;
    } catch (error) {
      return error.response?.data?.message || error.message;
    }
  }

  async function deleteTask(id) {
    try {
      const res = await apiClient.delete(`/api/tasks/${id}`);
      return res.data;
    } catch (error) {
      return error.response?.data?.message || error.message;
    }
  }

  async function editTask(id, updatedData) {
    try {
      const res = await apiClient.put(`/api/tasks/${id}`, updatedData);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Failed to update the task.");
      }
    } catch (error) {
      return error.response?.data?.message || error.message;
    }
  }

  const getAllUser = async () => {
    try {
      const res = await apiClient.get(`/api/users`);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Failed to get All the users in the dbs.");
      }
    } catch (error) {
      return error.response?.data?.message || error.message;
    }
  };

  const addPeople = async (id) => {
    console.log("Assignee ID:", id); // Check what value is being passed
    try {
      const res = await apiClient.put(`/api/tasks/assignalltask`, {
        assigneeId: id,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Failed to add people.");
      }
    } catch (error) {
      console.error("Error in addPeople:", error);
      return error.response?.data?.message || error.message;
    }
  };

  return {
    updateProfile,
    createTask,
    getUsersTasks,
    filterTaskByDueDate,
    filterTaskByStatus,
    updateStatus,
    filterByPriority,
    dueDateTasks,
    getTaskById,
    deleteTask,
    editTask,
    getAllUser,
    addPeople,
  };
}

export default customHooks;
