import s from "./Analytics.module.css";
import elli from "../../assets/Ellipse.svg";
import customHooks from "../CustomHooks/CustomHooks";
import { useEffect, useState } from "react";

const Analytics = () => {
  const { filterTaskByStatus, filterByPriority, dueDateTasks } = customHooks();
  const [analysis, setAnalysis] = useState({
    back: 0,
    todo: 0,
    prog: 0,
    done: 0,
    low: 0,
    mod: 0,
    high: 0,
    date: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const backlogData = await filterTaskByStatus("backlog");
      const backlogValue = backlogData.length;
      const todoData = await filterTaskByStatus("to-do");
      const todoValue = todoData.length;
      const progData = await filterTaskByStatus("in-progress");
      const progValue = progData.length;
      const doneData = await filterTaskByStatus("done");
      const doneValue = doneData.length;

      const lowValue = await filterByPriority("Low Priority");
      const lowData = lowValue.length;
      const moderateValue = await filterByPriority("Moderate Priority");
      const moderateData = moderateValue.length;
      const highValue = await filterByPriority("High Priority");
      const highData = highValue.length;

      const dueValue = await dueDateTasks();
      console.log("dueValue", dueValue);
      const dueData = dueValue.length;

      setAnalysis((prev) => ({
        ...prev,
        back: backlogValue,
        todo: todoValue,
        prog: progValue,
        done: doneValue,
        low: lowData,
        mod: moderateData,
        high: highData,
        date: dueData,
      }));
    };

    fetchData();
  }, []);

  return (
    <div className={s.main}>
      <h2>Analytics</h2>
      <div className={s.container}>
        <div className={s.taskBox}>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>Backlog Tasks</p>
            </div>
            <div>{analysis.back}</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>To-do Tasks</p>
            </div>
            <div>{analysis.todo}</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>In-progress Tasks</p>
            </div>
            <div>{analysis.prog}</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>Completed Tasks</p>
            </div>
            <div>{analysis.done}</div>
          </div>
        </div>
        <div className={s.taskBox}>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>Low Priority</p>
            </div>
            <div>{analysis.low}</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>Moderate Priority</p>
            </div>
            <div>{analysis.mod}</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>High Priority</p>
            </div>
            <div>{analysis.high}</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>Due Date Tasks</p>
            </div>
            <div>{analysis.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
