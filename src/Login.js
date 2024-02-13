import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import "./style/Login.css";
import { emailRegex, passwordCheckingRegex, token } from "./Constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginTokenContext } from "./Context";

const Login = () => {
  const [loginToken, setLoginToken] = useContext(LoginTokenContext);
  const navigate = useNavigate();

  const formSubmit = async (resetForm) => {
    const randomToken = Math.random();
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/authentication",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Login successful!");
      console.log(response);
      resetForm();
      setLoginToken(randomToken);
      localStorage.setItem("token", randomToken);
      navigate("/");
    } catch (err) {
      toast.error("Login unsuccessful");
    }
  };
  return (
    <div className="total-login">
      <div className="login-section">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .trim()
              .email()
              .matches(emailRegex, "Must be a valid email")
              .required("This field is mandatory"),
            password: yup
              .string()
              .trim()
              .matches(
                passwordCheckingRegex,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              )
              .required("This field is mandatory"),
          })}
          onSubmit={(values, { resetForm }) => {
            formSubmit(resetForm);
          }}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => {
            return (
              <form>
                <h1>LOGIN</h1>
                <input
                  placeholder="Email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <span className="error-message">
                  <ErrorMessage name="email" />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <span className="error-message">
                  <ErrorMessage name="password" />
                </span>
                <button onClick={handleSubmit}>Login</button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
