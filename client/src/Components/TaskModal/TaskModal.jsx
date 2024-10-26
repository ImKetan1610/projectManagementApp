import { useState } from "react";
import s from "./TaskModal.module.css";
import hp from "../../assets/HighPriorityIcon.svg";
import mp from "../../assets/ModeratePriorityIcon.svg";
import lp from "../../assets/LowPriorityIcon.svg";
import di from "../../assets/DeleteIcon.svg";

const TaskModal = ({ isOpen, onClose, onSave }) => {
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [checklist, setChecklist] = useState([
    { id: 1, text: "", completed: false },
  ]);
  const [dueDate, setDueDate] = useState("");

  const handlePriorityChange = (level) => {
    setPriority(level);
  };

  const handleAddChecklistItem = () => {
    setChecklist([
      ...checklist,
      { id: Date.now(), text: "", completed: false },
    ]);
  };

  const handleChecklistChange = (id, text) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  const handleChecklistToggle = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteChecklistItem = (id) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    onSave({ priority, assignedTo, checklist, dueDate });
    onClose();
  };

  const completedCount = checklist.filter((item) => item.completed).length;

  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <p>
          <strong>
            Title<sup>*</sup>
          </strong>
        </p>
        <input className={s.titleInput} type="text" />

        <div className={s.prioritySection}>
          <p>
            Select Priority:<sup>*</sup>
          </p>
          <button
            className={`${s.priorityButton} ${
              priority === "High Priority" ? s.active : ""
            }`}
            onClick={() => handlePriorityChange("High Priority")}
          >
            <img src={hp} alt="high" /> &nbsp; HIGH PRIORITY
          </button>
          <button
            className={`${s.priorityButton} ${
              priority === "Moderate Priority" ? s.active : ""
            }`}
            onClick={() => handlePriorityChange("Moderate Priority")}
          >
            <img src={mp} alt="moderate" /> &nbsp; MODERATE PRIORITY
          </button>
          <button
            className={`${s.priorityButton} ${
              priority === "Low Priority" ? s.active : ""
            }`}
            onClick={() => handlePriorityChange("Low Priority")}
          >
            <img src={lp} alt="low" /> &nbsp; LOW PRIORITY
          </button>
        </div>

        <div className={s.assignSection}>
          <label>Assign to:</label>
          <input
            type="text"
            placeholder="Add an assignee"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>

        <div className={s.checklistSection}>
          <label>
            Checklist ({completedCount}/{checklist.length}) <sup>*</sup>
          </label>
          <div className={s.checklistItemsDiv}>
            {checklist.map((item) => (
              <div key={item.id} className={s.checklistItem}>
                <div>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleChecklistToggle(item.id)}
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) =>
                      handleChecklistChange(item.id, e.target.value)
                    }
                    className={s.checklistInput}
                    placeholder="Please add checklist item here"
                  />
                </div>
                <button
                  onClick={() => handleDeleteChecklistItem(item.id)}
                  className={s.deleteButton}
                >
                  <img src={di} alt="delete" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={handleAddChecklistItem} className={s.addButton}>
            + Add New
          </button>
        </div>

        <div className={s.modalActions}>
          <div className={s.dueDateSection}>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button className={s.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={s.save} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
