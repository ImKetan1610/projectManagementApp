import s from "./Board.module.css";
import plus from "../../assets/plusIcon.svg";
import collapse from "../../assets/collapse.svg";

const Board = () => {
  const name = localStorage.getItem("name") || "User";

  const todayDate = getTodaysDate();
  function getTodaysDate() {
    const date = new Date();
    const suffixes = ["th", "st", "nd", "rd"];
    const day = date.getDate();

    // Determine the suffix for the day
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
  return (
    <div className={s.container}>
      <header className={s.header}>
        <h2>Welcome! {name}</h2>
        <p>{todayDate}</p>
      </header>
      <h2>Board</h2>
      <div className={s.boxContainer}>
        <div className={s.statusContainer}>
          <p>
            <strong>Backlog</strong>
          </p>
        </div>
        <div className={s.statusContainer}>
          <div className={s.todoBox}>
            <p>
              <strong>To do</strong>
            </p>
            <div>
              <img src={plus} alt="add" />
              <img src={collapse} alt="collapse" />
            </div>
          </div>
        </div>
        <div className={s.statusContainer}>
          <p>
            <strong>In progress</strong>
          </p>
        </div>
        <div className={s.statusContainer}>
          <p>
            <strong>Done</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board;
