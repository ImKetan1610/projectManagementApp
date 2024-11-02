import { useState } from "react";
import s from "./TaskCard.module.css";
import up from "../../assets/ArrowUp.svg";
import down from "../../assets/ArrowDown.svg";
import customHooks from "../CustomHooks/CustomHooks";
import { BACKEND_URL } from "../../utils/constant";

const TaskCard = ({ task }) => {
  const { updateStatus, deleteTask } = customHooks();
  const [checklist, setChecklist] = useState(task.checklist);
  const [showChecklist, setShowChecklist] = useState(true);
  const [status, setStatus] = useState("Backlog");
  const [showOptions, setShowOptions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for the modal

  const handleToggleChecklist = () => setShowChecklist(!showChecklist);

  const handleChecklistToggle = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].checked = !updatedChecklist[index].checked;
    setChecklist(updatedChecklist);
  };

  const completedCount = checklist.filter((item) => item.checked).length;

  const formatDueDate = (dateString) => {
    if (dateString == null || dateString === "null") return "";
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
  };

  // Function to handle copying the link
  const handleShareClick = () => {
    const shareableLink = window.location.origin + `/shareTask/${task._id}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  // Function to handle delete action
  const handleDelete = () => {
    // Make an API call to delete the task (Assuming you have an endpoint for it)
    // Here is a mock implementation, replace it with actual delete logic
    deleteTask(task._id);

    setShowModal(false); // Close the modal after deletion
    window.location.reload();
  };

  return (
    <div className={s.taskCard}>
      {/* Toast Notification */}
      {showToast && <div className={s.toast}>Link Copied!</div>}

      {/* Modal for Confirmation */}
      {showModal && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <h2>Are you sure you want to delete this task?</h2>
            <button onClick={handleDelete} className={s.confirmButton}>
              Yes, Delete
            </button>
            <button
              onClick={() => setShowModal(false)}
              className={s.cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Header with Priority and Options */}
      <div className={s.taskHeader}>
        <div>
          <div className={`${s[task.priority.toLowerCase().split(" ")[0]]}`}>
            &nbsp;
          </div>
          <span className={`${s.priority}`}>{task.priority.toUpperCase()}</span>
        </div>

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
            <div className={s.dropdownOption} onClick={handleShareClick}>
              Share
            </div>
            <div
              className={`${s.dropdownOption} ${s.delete}`}
              onClick={() => setShowModal(true)}
            >
              Delete
            </div>
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
            <img src={up} alt="hide" />
          ) : (
            <img src={down} alt="show" />
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
          className={`${s.statusButton} ${
            task.dueDate === "null" || task.dueDate === null ? s.nullButton : ""
          } ${s[task.priority.toLowerCase().split(" ").join("_")]}`}
        >
          {formatDueDate(task.dueDate)}
        </button>

        {/* Conditional Status Buttons */}
        {task.status === "backlog" && (
          <>
            <button
              onClick={async () => {
                setStatus("to-do");
                await updateStatus(task._id, "to-do");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              To-Do
            </button>
            <button
              onClick={async () => {
                setStatus("in-progress");
                await updateStatus(task._id, "in-progress");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              In Progress
            </button>
            <button
              onClick={async () => {
                setStatus("done");
                await updateStatus(task._id, "done");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              Done
            </button>
          </>
        )}

        {task.status === "to-do" && (
          <>
            <button
              onClick={async () => {
                setStatus("backlog");
                await updateStatus(task._id, "backlog");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              Backlog
            </button>
            <button
              onClick={async () => {
                setStatus("in-progress");
                await updateStatus(task._id, "in-progress");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              In Progress
            </button>
            <button
              onClick={async () => {
                setStatus("done");
                await updateStatus(task._id, "done");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              Done
            </button>
          </>
        )}

        {task.status === "in-progress" && (
          <>
            <button
              onClick={async () => {
                setStatus("backlog");
                await updateStatus(task._id, "backlog");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              Backlog
            </button>
            <button
              onClick={async () => {
                setStatus("to-do");
                await updateStatus(task._id, "to-do");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              To-Do
            </button>
            <button
              onClick={async () => {
                setStatus("done");
                await updateStatus(task._id, "done");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              Done
            </button>
          </>
        )}

        {task.status === "done" && (
          <>
            <button
              onClick={async () => {
                setStatus("backlog");
                await updateStatus(task._id, "backlog");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              Backlog
            </button>
            <button
              onClick={async () => {
                setStatus("to-do");
                await updateStatus(task._id, "to-do");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              To-Do
            </button>
            <button
              onClick={async () => {
                setStatus("in-progress");
                await updateStatus(task._id, "in-progress");
                window.location.reload();
              }}
              className={s.statusButton}
            >
              In Progress
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
