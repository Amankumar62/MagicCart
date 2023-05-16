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

  const checkLogin = () => {
    return userData.isLoggedIn;
  };
  return (
    <AuthContext.Provider value={{ setLoginSuccess, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
