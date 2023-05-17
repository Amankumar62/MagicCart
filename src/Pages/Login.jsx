import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../Context/AuthContext";

export const Login = () => {
  const { setLoginSuccess } = useContext(AuthContext);
  const navigate = useNavigate();
  const authenticateUser = async (event, email, password) => {
    event.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log(response.status);
      if (response.status === 200) {
        const responseData = await response.json();
        setLoginSuccess(responseData);
        localStorage.setItem("token", responseData.encodedToken);
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
    }
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
          pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
        />
        <label className="login-label" htmlFor="userPassword">
          Password
        </label>
        <input
          className="login-input"
          type="password"
          placeholder="**********"
          id="userPassword"
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
