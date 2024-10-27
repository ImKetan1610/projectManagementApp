import React, { useState } from "react";
import s from "./TaskCard.module.css";
import up from "../../assets/ArrowUp.svg";
import down from "../../assets/ArrowDown.svg";

const TaskCard = ({ task }) => {
  const [checklist, setChecklist] = useState(task.checklist);
  const [showChecklist, setShowChecklist] = useState(true);
  const [status, setStatus] = useState("Not Started");

  const handleToggleChecklist = () => setShowChecklist(!showChecklist);

  const handleChecklistToggle = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].checked = !updatedChecklist[index].checked;
    setChecklist(updatedChecklist);
  };

  const completedCount = checklist.filter((item) => item.checked).length;

  return (
    <div className={s.taskCard}>
      {/* Header with Priority and Options */}
      <div className={s.taskHeader}>
        <span className={`${s.priority} ${s[task.priority.toLowerCase()]}`}>
          {task.priority}
        </span>
        <span className={s.options}>...</span>
      </div>

      {/* Title */}
      <h3 className={s.taskTitle}>{task.title}</h3>

      {/* Checklist Toggle and Count */}
      <div className={s.checklistHeader}>
        <span>
          Checklist ({completedCount}/{checklist.length})
        </span>
        <button onClick={handleToggleChecklist} className={s.toggleButton}>
          {showChecklist ? (
            <button>
              <img src={up} alt="hide" />
            </button>
          ) : (
            <button>
              <img src={down} alt="show" />
            </button>
          )}
        </button>
      </div>

      {/* Checklist Items */}
      {showChecklist && (
        <ul className={s.checklist}>
          {checklist.map((item, index) => (
            <li key={index} className={s.checklistItem}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChecklistToggle(index)}
                className={s.checkbox}
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Due Date */}
      {/* <div className={s.dueDate}>Due Date: {task.dueDate}</div> */}

      {/* Status Buttons */}
      <div className={s.statusButtons}>
        <button className={s.statusButton}>{task.dueDate}</button>
        {["To-Do", "In Progress", "Done"].map((stat) => (
          <button
            key={stat}
            onClick={() => setStatus(stat)}
            className={`${s.statusButton} ${status === stat ? s.active : ""}`}
          >
            {stat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
