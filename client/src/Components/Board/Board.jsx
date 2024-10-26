import { useState } from "react";
import s from "./Board.module.css";
import plus from "../../assets/plusIcon.svg";
import collapse from "../../assets/collapse.svg";
import TaskModal from "../TaskModal/TaskModal";

const Board = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const name = localStorage.getItem("name") || "User";

  const todayDate = getTodaysDate();
  function getTodaysDate() {
    const date = new Date();
    const suffixes = ["th", "st", "nd", "rd"];
    const day = date.getDate();
    const suffix =
      suffixes[day % 10 > 3 || Math.floor(day / 10) === 1 ? 0 : day % 10];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}${suffix} ${month}, ${year}`;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveTask = (taskData) => {
    console.log("Saved Task:", taskData);
  };

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h2>Welcome! {name}</h2>
        <p>{todayDate}</p>
      </header>
      <h2>Board</h2>
      <div className={s.boxContainer}>
        <div className={s.statusContainer}>
          <div className={s.todoBox}>
            <p>
              <strong>Backlog</strong>
            </p>
            <div>
              <img src={collapse} alt="collapse" />
            </div>
          </div>
        </div>
        <div className={s.statusContainer}>
          <div className={s.todoBox}>
            <p>
              <strong>To do</strong>
            </p>
            <div>
              <img
                src={plus}
                alt="add"
                onClick={openModal}
                style={{ cursor: "pointer" }}
              />
              <img src={collapse} alt="collapse" />
            </div>
          </div>
        </div>
        <div className={s.statusContainer}>
          <div className={s.todoBox}>
            <p>
              <strong>In progress</strong>
            </p>
            <div>
              <img src={collapse} alt="collapse" />
            </div>
          </div>
        </div>
        <div className={s.statusContainer}>
          <div className={s.todoBox}>
            <p>
              <strong>Done</strong>
            </p>
            <div>
              <img src={collapse} alt="collapse" />
            </div>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Board;
