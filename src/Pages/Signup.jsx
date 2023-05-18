import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
export const Signup = () => {
  const { signUpHandler, checkLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  if (checkLogin()) {
    navigate("/");
  }
  return (
    <>
      <form
        onSubmit={(e) =>
          signUpHandler(
            e,
            e.target.elements.firstname.value,
            e.target.elements.lastname.value,
            e.target.elements.email.value,
            e.target.elements.password.value
          )
        }
        className="signup-container"
      >
        <h2 className="signup-heading">Sign Up</h2>
        <label for="firstname" className="signup-label">
          First Name
        </label>
        <input
          id="firstname"
          className="signup-input"
          type="text"
          placeholder="John"
          required={true}
        />
        <label for="lastname" className="signup-label">
          Last Name
        </label>
        <input
          id="lastname"
          className="signup-input"
          type="text"
          placeholder="Walter"
          required={true}
        />
        <label for="email" className="signup-label">
          Email Address
        </label>
        <input
          id="email"
          className="signup-input"
          type="text"
          placeholder="example@gmail.com"
          pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          required={true}
        />
        <label for="password" className="signup-label">
          Password
        </label>
        <input
          id="password"
          className="signup-input"
          type="password"
          placeholder="********"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
          required={true}
        />
        <button type="submit" className="signup-button">
          Create New Account
        </button>
        <Link className="signup-link" to="/login">
          Already have an account &gt;
        </Link>
      </form>
    </>
  );
};
