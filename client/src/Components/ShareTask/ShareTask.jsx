import { useEffect, useState } from "react";
import customHooks from "../CustomHooks/CustomHooks";
import { useParams } from "react-router-dom";
import s from "./ShareTask.module.css";

const ShareTask = () => {
  const { getTaskById } = customHooks();
  const params = useParams();
  const [data, setData] = useState({});

  const completedCount = data?.checklist?.filter((item) => item.checked).length;

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();

    const ordinalSuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${formattedDate}${ordinalSuffix}`;
  }

  console.log("Task Data State:", data);
  const formattedDate = formatDate(data?.dueDate);
  console.log(formattedDate);

  return (
    <div className={s.taskCard}>
      <div className={s.taskHeader}>
        <div className={`${s[data?.priority?.toLowerCase().split(" ")[0]]}`}>
          &nbsp;
        </div>
        <span className={`${s.priority}`}>{data?.priority?.toUpperCase()}</span>
      </div>

      <h3 className={s.taskTitle}>{data.title}</h3>

      <div className={s.checklistHeader}>
        <span>
          Checklist ({completedCount}/{data?.checklist?.length})
        </span>
      </div>
      <ul className={s.checklist}>
        {data?.checklist?.map((item, index) => (
          <li key={index} className={s.checklistItem}>
            <input
              type="checkbox"
              checked={item.checked}
              className={s.checkbox}
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      {data?.dueDate && (
        <div
          className={`s.dueDateBox ${
            s[data?.priority?.toLowerCase().split(" ").join("_")]
          }`}
        >
          <span><strong>Due Date: </strong></span>
          <span>{formattedDate}</span>
        </div>
      )}
    </div>
  );
};

export default ShareTask;
