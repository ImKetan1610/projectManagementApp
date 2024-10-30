import { useState } from "react";
import s from "./TaskCard.module.css";
import up from "../../assets/ArrowUp.svg";
import down from "../../assets/ArrowDown.svg";

const TaskCard = ({ task }) => {
  console.log("taskPriority", task.priority);
  const [checklist, setChecklist] = useState(task.checklist);
  const [showChecklist, setShowChecklist] = useState(true);
  const [status, setStatus] = useState("Not Started");
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleChecklist = () => setShowChecklist(!showChecklist);

  const handleChecklistToggle = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].checked = !updatedChecklist[index].checked;
    setChecklist(updatedChecklist);
  };

  const completedCount = checklist.filter((item) => item.checked).length;

  const formatDueDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();

    // Add the ordinal suffix (st, nd, rd, th)
    const ordinalSuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${formattedDate}${ordinalSuffix}`;
  };

  return (
    <div className={s.taskCard}>
      {/* Header with Priority and Options */}
      <div className={s.taskHeader}>
        <span
          className={`${s.priority} ${
            s[task.priority.toLowerCase().split(" ")[0]]
          }`}
        >
          {task.priority.toUpperCase()}
        </span>

        <span
          className={s.options}
          onClick={() => setShowOptions(!showOptions)}
        >
          ...
        </span>

        {/* Dropdown Menu */}
        {showOptions && (
          <div className={s.dropdown}>
            <div className={s.dropdownOption}>Edit</div>
            <div className={s.dropdownOption}>Share</div>
            <div className={`${s.dropdownOption} ${s.delete}`}>Delete</div>
          </div>
        )}
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

      {/* Status and Due Date */}
      <div className={s.statusButtons}>
        <button
          className={`${s.statusButton} ${task.dueDate == null ? s.nullButton : ""}`}
        >
          {formatDueDate(task.dueDate)}
        </button>
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
