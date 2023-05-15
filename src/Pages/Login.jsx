import { Link } from "react-router-dom";
import "./Login.css";
export const Login = () => {
  return (
    <>
      <form className="login-container">
        <h2 className="login-heading">Login</h2>
        <label className="login-label" htmlFor="user-email">
          Email Address
        </label>
        <input
          className="login-input"
          type="email"
          placeholder="example@gmail.com"
          id="user-email"
          pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
        />
        <label className="login-label" htmlFor="user-email">
          Password
        </label>
        <input
          className="login-input"
          type="password"
          placeholder="**********"
          id="user-password"
        />
        <button className="login-button">Login</button>
        <button className="login-button">Login with Test Credentials</button>
        <Link className="login-link" to="/signup">
          Create New Account &gt;
        </Link>
      </form>
    </>
  );
};
