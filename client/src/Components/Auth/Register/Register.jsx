import s from "./Register.module.css";
import SideAuth from "../SideAuth/SideAuth";

const Register = () => {
  const handleSubmit = () => {};
  return (
    <div className={s.container}>
      <div className={s.side}>
        <SideAuth />
      </div>
      <div className={s.formDiv}>
        <h2>Register</h2>
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.formSection}>
            <input
              type="text"
              className={s.userIcon}
              placeholder="Name"
              required
            />
          </div>

          <div className={s.formSection}>
            <input
              type="text"
              className={s.emailIcon}
              placeholder="Email"
              required
            />
          </div>

          <div className={s.formSection}>
            <input
              type="text"
              className={s.password}
              placeholder="Password"
              required
            />
          </div>
          <div className={s.formSection}>
            <input
              type="text"
              className={s.password}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className={s.formSection}>
            <input type="submit" className={s.registerBtn} value="Register" />
            <p style={{ textAlign: "center" }}>Have an account ?</p>
            <input type="button" className={s.loginBtn} value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
