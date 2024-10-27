import { useNavigate } from "react-router-dom";
import SideAuth from "../SideAuth/SideAuth";
import s from "./Login.module.css";
import { useContext, useState } from "react";
import { context } from "../../Context/UserContext";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/constant";

const Login = () => {
  const { setUser } = useContext(context);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let validationErrors = {};

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "* Please add a valid email ID";
    }

    // Password validation
    if (!formData.password || formData.password.length < 8) {
      validationErrors.password =
        "* Password must be at least 8 characters long";
    }

    return validationErrors;
  };

  // console.log("44", formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // console.log(formData);
      try {
        let res = await axios.post(BACKEND_URL + "/api/users/login", formData);
        if (res.status === 200) {
          console.log("56", res);
          let token = res.data.token;
          setUser({
            email: formData.email,
            isAuthorize: true,
            username: res.data.name,
          });
          localStorage.setItem("proManage", token);
          localStorage.setItem("proManage:username", res.data.name);
          navigate("/board");
        }
      } catch (error) {
        console.error("Login error:", error);
        // Handle error responses here
      }
    }
  };

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
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={s.emailIcon}
              required
            />
            {errors.email && <div className={s.errorText}>{errors.email}</div>}
          </div>

          <div className={s.formSection}>
            <input
              type="password"
              name="password"
              value={formData.password}
              className={s.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            {errors.password && (
              <div className={s.errorText}>{errors.password}</div>
            )}
          </div>

          <div className={s.formSection}>
            <input type="submit" className={s.registerBtn} value="Login" />
            <p style={{ textAlign: "center" }}>Have no account yet?</p>
            <input
              type="button"
              className={s.loginBtn}
              value="Register"
              onClick={() => navigate("/auth/register")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
