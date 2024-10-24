import s from "./Board.module.css";

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
      <div></div>
    </div>
  );
};

export default Board;
