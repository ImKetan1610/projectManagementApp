import { useState, useEffect } from "react";
import s from "./TaskCard.module.css";
import up from "../../assets/ArrowUp.svg";
import down from "../../assets/ArrowDown.svg";
import hp from "../../assets/HighPriorityIcon.svg";
import mp from "../../assets/ModeratePriorityIcon.svg";
import lp from "../../assets/LowPriorityIcon.svg";
import di from "../../assets/DeleteIcon.svg";
import customHooks from "../CustomHooks/CustomHooks";

const TaskCard = ({ task }) => {
  const { updateStatus, deleteTask, editTask } = customHooks();
  const [checklist, setChecklist] = useState(task.checklist);
  const [showChecklist, setShowChecklist] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    setChecklist(task.checklist);
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setDueDate(task.dueDate);
    setStatus(task.status);
  }, [task]);

  const handleToggleChecklist = () => setShowChecklist((prev) => !prev);

  const handleChecklistToggle = (index) => {
    setChecklist((prev) => {
      const updatedChecklist = [...prev];
      updatedChecklist[index].checked = !updatedChecklist[index].checked;
      return updatedChecklist;
    });
  };

  const completedCount = checklist.filter((item) => item.checked).length;

  const formatDueDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    return `${date.toLocaleDateString("en-US", options)}${getOrdinalSuffix(
      date.getDate()
    )}`;
  };

  const getOrdinalSuffix = (day) => {
    return day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  };

  const handleShareClick = () => {
    const shareableLink = `${window.location.origin}/shareTask/${task._id}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    setShowModal(false);
  };

  const handleSaveEdit = async () => {
    try {
      await editTask(task._id, {
        title: editTitle,
        priority,
        dueDate,
        checklist,
        status,
      });
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleAddChecklistItem = () => {
    setChecklist((prev) => [...prev, { label: "", checked: false }]);
  };

  const handleDeleteChecklistItem = (index) => {
    setChecklist((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={s.taskCard}>
      {/* Toast Notification */}
      {showToast && <div className={s.toast}>Link Copied!</div>}

      {/* Delete Confirmation Modal */}
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

      {/* Edit Task Modal */}
      {showEditModal && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <h2>Edit Task</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <ul>
              {checklist.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleChecklistToggle(index)}
                  />
                  <span>{item.label}</span>
                  <button onClick={() => handleDeleteChecklistItem(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={handleAddChecklistItem}>Add Checklist Item</button>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
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
            <div
              className={s.dropdownOption}
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </div>
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

      {/* Rest of your TaskCard component */}
      <h3 className={s.taskTitle}>{task.title}</h3>
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
