import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
export const RequireAuth = ({ children }) => {
  const { checkLogin } = useContext(AuthContext);
  const location = useLocation();
  return checkLogin() ? children : <Navigate to="/login" state={location} />;
};
