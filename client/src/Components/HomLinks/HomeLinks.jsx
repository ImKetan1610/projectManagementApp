import { NavLink, useNavigate } from "react-router-dom";
import s from "./HomeLinks.module.css";
import board from "../../assets/board.svg";
import ana from "../../assets/analytics.svg";
import set from "../../assets/settings.svg";
import icon from "../../assets/icon.svg";
import logoutIcon from "../../assets/LogoutIcon.svg";
// import { useContext, useEffect } from "react";
// import { context } from "../Context/UserContext";

function HomeLinks() {
  let navigate = useNavigate();
  //   const { user, setUser } = useContext(context);

  function handleLogOut() {
    // setUser((prev) => {
    //   return {
    //     ...prev,
    //     isAuthorize: false,
    //     email: "",
    //     username: "",
    //   };
    // });
    localStorage.removeItem("proManage");
    localStorage.removeItem("proManage:username");
    navigate("/auth/login");
  }

  //   useEffect(() => {
  //     if (user && user.isAuthorize === false) {
  //       navigate("/auth/login");
  //     }
  //   }, [user?.isAuthorize, navigate]);

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
        <h2 onClick={handleLogOut} className={s.logout}>
          <img src={logoutIcon} alt="logout" />
          Log out
        </h2>
      </div>
    </div>
  );
}

export default HomeLinks;
