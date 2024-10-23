import s from "./SideAuth.module.css";
import back from "../../../assets/Back.svg";
import group from "../../../assets/Group.svg";

const SideAuth = () => {
  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <img src={back} alt="Back" className={s.backImage} />
        <img src={group} alt="Group" className={s.groupImage} />
        <h2>Welcome aboard my friend</h2>
        <p>just a couple of clicks and we start</p>
      </div>
    </div>
  );
};

export default SideAuth;
