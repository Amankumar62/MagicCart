import { createContext, useContext, useReducer } from "react";
import { CartContext } from "./CartContext";
import { userReducer } from "../reducer/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, dispatch] = useReducer(userReducer, {
    isLoggedIn: false,
    user: {},
    address: [
      {
        id: "1",
        active: false,
        name: "Maggie Raynor",
        mobile: "6731682187",
        pincode: "309321",
        user_address: "94993 Trantow Pine",
      },
    ],
    orderHistory: [],
    token: "",
  });
  const { resetCartContext } = useContext(CartContext);
  const setLoginSuccess = (data) => {
    console.log(data);
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
        resetCartContext();
        setLoginSuccess(responseData);
        localStorage.setItem("token", responseData.encodedToken);
        toast.success(
          `Welcome ${
            responseData.foundUser.firstName +
            " " +
            responseData.foundUser.lastName
          }`,
          {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
      if (response.status === 404) {
        //token not found
        toast.error("Wrong credentials.\nInvalid email or password provided", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      if (response.status === 422) {
        toast.error(
          "A user account alrady exists with the provided email address",
          {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
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
        resetCartContext();
        localStorage.setItem("token", responseData.encodedToken);
        navigate("/login");
        toast.success("User created. Please login to continue", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (response.status === 422) {
        toast.error(
          "A user account alrady exists with the provided email address",
          {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
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
        user: userData.user,
      },
    });
  };

  const selectAddressHandler = (addId) => {
    dispatch({ type: "SELECT_ADDRESS", payload: addId });
  };

  const removeAddressHandler = (addId) => {
    dispatch({ type: "REMOVE_ADDRESS", payload: addId });
  };

  const orderHistoryHandler = (
    payment_id,
    amount,
    date,
    address,
    orderItems
  ) => {
    dispatch({
      type: "ADD_ORDER",
      payload: {
        paymentId: payment_id,
        totalAmount: amount,
        orderDate: date,
        deliveryAddress: address,
        cart: orderItems,
      },
    });
  };

  console.log(userData.orderHistory);
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
        orderHistoryHandler,
        address: userData.address,
        user: userData.user,
        orderHistory: userData.orderHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
