import { useContext } from "react";
import { LoginTokenContext } from "./Context";
import "./style/Nav.css";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const [loginToken, setLoginToken] = useContext(LoginTokenContext);
  const navigate = useNavigate();
  const logOut = () => {
    setLoginToken(localStorage.clear());
    navigate("/login");
  };
  return (
    <div className="nav-bar">
      <h2>Movie App</h2>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
export default Nav;
