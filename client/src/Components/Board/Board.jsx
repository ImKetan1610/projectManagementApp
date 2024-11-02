import { useState, useEffect } from "react";
import s from "./Board.module.css";
import plus from "../../assets/plusIcon.svg";
import collapse from "../../assets/collapse.svg";
import TaskModal from "../TaskModal/TaskModal";
import TaskCard from "../TaskCard/Taskcard";
import customHooks from "../CustomHooks/CustomHooks";
import people from "../../assets/peopleIcon.svg";

const Board = () => {
  const { getUsersTasks, filterTaskByStatus } = customHooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [backlogTaskList, setBacklogTaskList] = useState([]);
  const [todoTaskList, setTodoTaskList] = useState([]);
  const [progressTaskList, setProgressTaskList] = useState([]);
  const [doneTaskList, setDoneTaskList] = useState([]);

  const name = localStorage.getItem("proManage:username") || "User";

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

  const handleFilterChange = async (event) => {
    const filterValue = event.target.value;
    setSelectedFilter(filterValue);

    try {
      // Use filterTaskByStatus to filter by both due date and status
      const tasks = await filterTaskByStatus("", filterValue);
      setTaskList(tasks);
    } catch (error) {
      console.error("Error filtering tasks by due date:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const todoList = await filterTaskByStatus("to-do", selectedFilter);
      const list = await getUsersTasks();
      const backList = await filterTaskByStatus("backlog", selectedFilter);
      const progressList = await filterTaskByStatus(
        "in-progress",
        selectedFilter
      );
      const doneList = await filterTaskByStatus("done", selectedFilter);

      // if (isMounted) {
      setTodoTaskList(todoList);
      setTaskList(list);
      setBacklogTaskList(backList);
      setProgressTaskList(progressList);
      setDoneTaskList(doneList);
      // }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    // let isMounted = true;
    fetchTasks();

    // return () => {
    //   isMounted = false;
    // };
  }, []);

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h2>Welcome! {name}</h2>
        <p>{todayDate}</p>
      </header>
      <div className={s.boardTitle}>
        <div>
          <h2>Board</h2>
          <span>
            <img src={people} alt="People" />
            &nbsp;Add People
          </span>
        </div>
        <div>
          <select
            id="taskFilter"
            value={selectedFilter}
            onChange={handleFilterChange}
            style={{
              border: 0,
              backgroundColor: "transparent",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
          </select>
        </div>
      </div>
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
          {backlogTaskList?.map((task) => (
            <TaskCard fetchData={fetchTasks} key={task._id} task={task} />
          ))}
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
          {todoTaskList?.map((task) => (
            <TaskCard fetchData={fetchTasks} key={task._id} task={task} />
          ))}
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
          {progressTaskList?.map((task) => (
            <TaskCard fetchData={fetchTasks} key={task._id} task={task} />
          ))}
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
          {doneTaskList?.map((task) => (
            <TaskCard fetchData={fetchTasks} key={task._id} task={task} />
          ))}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveTask}
        fetchData={fetchTasks}
      />
    </div>
  );
};

export default Board;
