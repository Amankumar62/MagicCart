import { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../Context/AuthContext";

export const Login = () => {
  const timerId = useRef();
  const { checkLogin, user, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  if (checkLogin()) {
    if (location?.state?.pathname) {
      navigate(location?.state?.pathname);
    } else {
      navigate("/");
    }
  }

  const debounceClick = (callback, delay, e, ...args) => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      callback(e, ...args);
    }, delay);
  };

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
          value={user?.email}
          pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          required={true}
        />
        <label className="login-label" htmlFor="userPassword">
          Password
        </label>
        <input
          className="login-input"
          type="password"
          value={user?.password}
          placeholder="**********"
          id="userPassword"
          required={true}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        <button
          onClick={(e) =>
            debounceClick(authenticateUser, 300, e, "test@gmail.com", "test")
          }
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
