import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
export const Signup = () => {
  const { signUpHandler, checkLogin } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenConfirm, setIsHiddenConfirm] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  if (checkLogin()) {
    navigate("/");
  }
  const disablehandler = (e) => {
    if (e.target.value.trim() === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  const confirmPasswordHandler = (e) => {
    if (
      !disabled &&
      e.target.value.trim() !== "" &&
      document.getElementById("password").value !== e.target.value
    ) {
      setMsg("Password not matching");
    } else {
      setMsg("");
    }
  };
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
          type="email"
          placeholder="example@gmail.com"
          pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          required={true}
        />
        <label for="password" className="signup-label">
          Password
        </label>
        <input
          id="password"
          className="signup-input"
          type={isHidden ? "password" : "text"}
          placeholder="********"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
          required={true}
          onChange={(e) => disablehandler(e)}
        />
        <span className="show-password" onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
        <p className="match-password">{msg}</p>
        <label for="password" className="signup-label confirm-password">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          className="signup-input"
          type={isHiddenConfirm ? "password" : "text"}
          placeholder="********"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
          onChange={(e) => confirmPasswordHandler(e)}
          required={true}
          disabled={disabled}
        />
        <span
          className="show-password"
          onClick={() => setIsHiddenConfirm(!isHiddenConfirm)}
        >
          {isHiddenConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
        <button type="submit" className="signup-button" disabled={msg !== ""}>
          Create New Account
        </button>
        <Link className="signup-link" to="/login">
          Already have an account &gt;
        </Link>
      </form>
    </>
  );
};
