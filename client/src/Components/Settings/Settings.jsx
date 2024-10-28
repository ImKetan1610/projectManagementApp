import { useState } from "react";
import s from "./Settings.module.css";
import customHooks from "../CustomHooks/CustomHooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const { updateProfile } = customHooks();

  // State variables to handle form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API call
    const data = {
      name,
      email,
      oldPassword,
      newPassword,
    };

    try {
      const result = await updateProfile(data);
      if (result) {
        toast.success("Profile updated successfully!");
      } 
    } catch (error) {
      console.log("35",error)
      toast.error("Error updating profile. Please try again.", error.message);
    }
  };

  return (
    <div className={s.container}>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.formSection}>
          <input
            type="text"
            className={s.userIcon}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={s.formSection}>
          <input
            type="email"
            className={s.emailIcon}
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={s.formSection}>
          <input
            type="password"
            className={s.password}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className={s.formSection}>
          <input
            type="password"
            className={s.password}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className={s.formSection}>
          <input type="submit" className={s.updateBtn} value="Update" />
        </div>
      </form>

      {/* Toast Container to display notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Settings;
