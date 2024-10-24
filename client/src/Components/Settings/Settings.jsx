import s from "./Settings.module.css";

const Settings = () => {
  const handleSubmit = () => {};
  return (
    <div className={s.container}>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
      <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.formSection}>
            <input
              type="text"
              className={s.userIcon}
              placeholder="Name"
            />
          </div>

          <div className={s.formSection}>
            <input
              type="email"
              className={s.emailIcon}
              placeholder="Update Email"
            />
          </div>

          <div className={s.formSection}>
            <input
              type="password"
              className={s.password}
              placeholder="Old Password"
              required
            />
          </div>
          <div className={s.formSection}>
            <input
              type="password"
              className={s.password}
              placeholder="New Password"
              required
            />
          </div>
          <div className={s.formSection}>
            <input type="submit" className={s.updateBtn} value="Update" />
          </div>
        </form>
      </form>
    </div>
  );
};

export default Settings;
