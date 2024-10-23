import React from "react";
import SideAuth from "../SideAuth/SideAuth";
import s from "./Login.module.css"

const Login = () => {
  const handleSubmit = () => {};
  return (
    <div className={s.container}>
      <div className={s.side}>
        <SideAuth />
      </div>
      <div className={s.formDiv}>
        <h2>Login</h2>
        <form className={s.form} onSubmit={handleSubmit}>
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
            <input type="submit" className={s.registerBtn} value="Login" />
            <p style={{ textAlign: "center" }}>Have no account yet?</p>
            <input type="button" className={s.loginBtn} value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
