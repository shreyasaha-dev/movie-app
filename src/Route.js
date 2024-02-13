import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginTokenContext } from "./Context";

export const PublicRoute = ({ children }) => {
  const [loginToken, setLoginToken] = useContext(LoginTokenContext);
  if (loginToken) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
export const PrivateRoute = ({ children }) => {
  const [loginToken, setLoginToken] = useContext(LoginTokenContext);
  if (!loginToken) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};
