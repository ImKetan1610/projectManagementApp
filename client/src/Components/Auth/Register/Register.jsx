import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../Context/UserContext";
import s from "./Register.module.css";
import SideAuth from "../SideAuth/SideAuth";
import { BACKEND_URL } from "../../../utils/constant.js";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const { setUser } = useContext(context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (formData) => {
    const newErrors = {};

    // Name validation
    if (!formData.name || formData.name.length < 8) {
      newErrors.name = "* Name must be at least 8 characters long";
    }

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "* Please add a valid email ID";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "* Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "* Minimum length: 8 characters, Must include at least one special character, Should contain at least one number, Needs at least one lowercase letter, Requires at least one uppercase letter";
    }

    // Confirm password validation
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "* Passwords are not matching";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/api/users/register`,
          formData
        );
        if (res.status == 201) {
          console.log("register",res)
          const token = res.data.token;
          localStorage.setItem("proManage", token);
          // localStorage.setItem("proManage:username", res.data.name);
          setUser({
            email: formData.email,
            isAuthorize: true,
            name: res.data.name,
          });
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Registration error:", error);
        throw new Error(error.response.data.message);
      }
    }
  };

  console.log("1", formData);

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
              name="name"
              className={s.userIcon}
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className={s.errorText}>{errors.name}</span>}
          </div>

          <div className={s.formSection}>
            <input
              type="email"
              name="email"
              className={s.emailIcon}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className={s.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={s.formSection}>
            <input
              type="password"
              name="password"
              value={formData.password}
              className={s.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            {errors.password && (
              <span className={s.errorText}>{errors.password}</span>
            )}
          </div>
          <div className={s.formSection}>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={s.password}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPassword && (
              <span className={s.errorText}>{errors.confirmPassword}</span>
            )}
          </div>
          <div className={s.formSection}>
            <input type="submit" className={s.registerBtn} value="Register" />
            <p style={{ textAlign: "center" }}>Have an account ?</p>
            <input
              type="button"
              className={s.loginBtn}
              value="Login"
              onClick={() => navigate("/auth/login")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
