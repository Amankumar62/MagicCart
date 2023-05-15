import { Link } from "react-router-dom";
import "./Signup.css";
export const Signup = () => {
  return (
    <>
      <form className="signup-container">
        <h2 className="signup-heading">Sign Up</h2>
        <label for="firstname" className="signup-label">
          First Name
        </label>
        <input
          id="firstname"
          className="signup-input"
          type="text"
          placeholder="John"
        />
        <label for="lastname" className="signup-label">
          Last Name
        </label>
        <input
          id="lastname"
          className="signup-input"
          type="text"
          placeholder="Walter"
        />
        <label for="email" className="signup-label">
          Email Address
        </label>
        <input
          id="email"
          className="signup-input"
          type="text"
          placeholder="example@gmail.com"
          pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
        />
        <label for="password" className="signup-label">
          Password
        </label>
        <input
          id="password"
          className="signup-input"
          type="password"
          placeholder="********"
        />
        <button className="signup-button">Create New Account</button>
        <Link className="signup-link" to="/login">
          Already have an account &gt;
        </Link>
      </form>
    </>
  );
};
