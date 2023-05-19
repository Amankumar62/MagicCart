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
    case "ADD_ADDRESS":
      return { ...prevState, address: [...prevState.address, payload] };
    case "SELECT_ADDRESS":
      return {
        ...prevState,
        address: prevState.address.map((adds) =>
          adds.id === payload
            ? { ...adds, active: true }
            : { ...adds, active: false }
        ),
      };
    case "REMOVE_ADDRESS":
      console.log("coming here");
      return {
        ...prevState,
        address: prevState.address.filter(({ id }) => id !== payload),
      };
    default:
      return prevState;
  }
};

export const AuthProvider = ({ children }) => {
  const [userData, dispatch] = useReducer(userReducer, {
    isLoggedIn: false,
    user: {},
    address: [
      {
        id: "1",
        active: true,
        name: "Maggie Raynor",
        mobile: "6731682187",
        pincode: "309321",
        user_address: "94993 Trantow Pine",
      },
    ],
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

  const addAddressHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_ADDRESS",
      payload: {
        id: Math.floor(Math.random() * 100),
        name: e.target.elements.addressname.value,
        active: false,
        mobile: e.target.elements.mobileno.value,
        pincode: e.target.elements.pincode.value,
        user_address: e.target.elements.address.value,
      },
    });
  };

  const selectAddressHandler = (addId) => {
    dispatch({ type: "SELECT_ADDRESS", payload: addId });
  };

  const removeAddressHandler = (addId) => {
    console.log("clicked");
    dispatch({ type: "REMOVE_ADDRESS", payload: addId });
  };
  return (
    <AuthContext.Provider
      value={{
        setLoginSuccess,
        checkLogin,
        authenticateUser,
        logoutHandler,
        signUpHandler,
        addAddressHandler,
        selectAddressHandler,
        removeAddressHandler,
        address: userData.address,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
