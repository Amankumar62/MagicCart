import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../Context/AuthContext";

export const Login = () => {
  const { checkLogin, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  if (checkLogin()) {
    console.log(location?.state?.pathname);
    navigate(location?.state?.pathname);
  }
  return (
    <>
      <form
        onSubmit={(event) =>
          authenticateUser(
            event,
            event.target.elements.userEmail.value,
            event.target.elements.userPassword.value
          )
        }
        className="login-container"
      >
        <h2 className="login-heading">Login</h2>
        <label className="login-label" htmlFor="userEmail">
          Email Address
        </label>
        <input
          className="login-input"
          type="email"
          placeholder="example@gmail.com"
          id="userEmail"
          pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          required={true}
        />
        <label className="login-label" htmlFor="userPassword">
          Password
        </label>
        <input
          className="login-input"
          type="password"
          placeholder="**********"
          id="userPassword"
          required={true}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        <button
          onClick={(e) => authenticateUser(e, "test@gmail.com", "test")}
          className="login-button"
        >
          Login with Test Credentials
        </button>
        <Link className="login-link" to="/signup">
          Create New Account &gt;
        </Link>
      </form>
    </>
  );
};
