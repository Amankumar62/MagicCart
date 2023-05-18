import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const userReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...prevState,
        isLoggedIn: true,
        user: payload.foundUser,
        token: payload.encodedToken,
      };
    case "LOGOUT_SUCCESS":
      return { ...prevState, isLoggedIn: false, user: {}, token: "" };
    default:
      return prevState;
  }
};

export const AuthProvider = ({ children }) => {
  const [userData, dispatch] = useReducer(userReducer, {
    isLoggedIn: false,
    user: {},
    token: "",
  });
  const setLoginSuccess = (data) => {
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  };

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
      }
      if (response.status === 404) {
        //token not found
      }
      if (response.status === 422) {
        //useralready present
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signUpHandler = async (event, firstname, lastname, email, password) => {
    event.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
        firstName: firstname,
        lastName: lastname,
      };
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log(response.status);
      if (response.status === 201) {
        const responseData = await response.json();
        setLoginSuccess(responseData);
        localStorage.setItem("token", responseData.encodedToken);
      } else if (response.status === 404) {
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkLogin = () => {
    return userData.isLoggedIn && localStorage.getItem("token") !== null;
  };
  const logoutHandler = () => {
    if (checkLogin()) {
      dispatch({ type: "LOGOUT_SUCCESS", payload: [] });
      localStorage.removeItem("token");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        setLoginSuccess,
        checkLogin,
        authenticateUser,
        logoutHandler,
        signUpHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
