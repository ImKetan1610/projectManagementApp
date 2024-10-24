import s from "./Analytics.module.css";
import elli from "../../assets/Ellipse.svg";

const Analytics = () => {
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
            <div>0</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>To-do Tasks</p>
            </div>
            <div>0</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>In-progress Tasks</p>
            </div>
            <div>0</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>Completed Tasks</p>
            </div>
            <div>0</div>
          </div>
        </div>
        <div className={s.taskBox}>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>Low Priority</p>
            </div>
            <div>0</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>Moderate Priority</p>
            </div>
            <div>0</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>High Priority</p>
            </div>
            <div>0</div>
          </div>
          <div className={s.taskNameDiv}>
            <div>
              <img src={elli} alt="elli" />
              <p>Due Date Tasks</p>
            </div>
            <div>0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
