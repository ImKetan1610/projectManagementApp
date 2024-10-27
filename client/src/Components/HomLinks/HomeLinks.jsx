import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./HomeLinks.module.css";
import board from "../../assets/board.svg";
import ana from "../../assets/analytics.svg";
import set from "../../assets/settings.svg";
import icon from "../../assets/icon.svg";
import logoutIcon from "../../assets/LogoutIcon.svg";

function HomeLinks() {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleLogOut() {
    localStorage.removeItem("proManage");
    localStorage.removeItem("proManage:username");
    navigate("/auth/login");
  }

  return (
    <div className={s.container}>
      <div className={s.linkGroup}>
        <h2>
          <img src={icon} alt="" />
          Pro Manage
        </h2>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : s.link
          }
          end
          to={"board"}
        >
          <img src={board} alt="board" />
          Board
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : s.link
          }
          end
          to={"analytics"}
        >
          <img src={ana} alt="ana" />
          Analytics
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : s.link
          }
          end
          to={"settings"}
        >
          <img src={set} alt="setting" />
          Settings
        </NavLink>
      </div>
      <div>
        <h2 onClick={() => setShowModal(true)} className={s.logout}>
          <img src={logoutIcon} alt="logout" />
          Log out
        </h2>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <p>Are you sure you want to Logout?</p>
            <div className={s.modalActions}>
              <button onClick={handleLogOut} className={s.confirmButton}>
                Yes, Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={s.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeLinks;
