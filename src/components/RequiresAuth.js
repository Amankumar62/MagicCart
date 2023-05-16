import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router";
export const RequireAuth = ({ children }) => {
  const { checkLogin } = useContext(AuthContext);
  return checkLogin() ? children : <Navigate to="/login" />;
};
