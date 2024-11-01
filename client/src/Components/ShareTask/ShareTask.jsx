import { useEffect, useState } from "react";
import customHooks from "../CustomHooks/CustomHooks";
import { useParams } from "react-router-dom";
import s from "./ShareTask.module.css";

const ShareTask = () => {
  const { getTaskById } = customHooks();
  const params = useParams();
  const [data, setData] = useState({});

  // Use effect for fetching task details by ID
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        let newData = await getTaskById(params.id);
        console.log("Fetched Task Data:", newData);
        setData(newData);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTaskData(); 
  }, []); 

  console.log("Task Data State:", data);

  return (
    <div className={s.taskCard}>
      {/* Header with Priority and Options */}
      <div className={s.taskHeader}>
        <div>
          <div className={`${s[data?.priority?.toLowerCase()]}`}>&nbsp;</div>
          <span className={`${s.priority}`}>
            {data?.priority?.toUpperCase() || "N/A"}
          </span>
        </div>
      </div>

      <h3 className={s.taskTitle}>{data.title || "Untitled Task"}</h3>

      <div className={s.taskDetails}>
        <p>{data.description || "No description provided."}</p>
      </div>
    </div>
  );
};

export default ShareTask;
