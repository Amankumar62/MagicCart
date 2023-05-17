import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return { ...prevState, cart: [...payload] };
    case "ADD_TO_WISHLIST":
      return { ...prevState, wishlist: [...payload] };
    default:
      return prevState;
  }
};

export const CartProvider = ({ children }) => {
  const [cartData, dispatch] = useReducer(cartReducer, {
    cart: [],
    wishlist: [],
  });
  const getCartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const auth = {
        authorization: token,
      };
      const responseCart = await (
        await fetch("/api/user/cart", {
          method: "GET",
          headers: auth,
        })
      ).json();
      const responseWishlist = await (
        await fetch("/api/user/wishlist", {
          method: "GET",
          headers: auth,
        })
      ).json();
      dispatch({
        type: "ADD_TO_CART",
        payload: responseCart.cart,
      });
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: responseWishlist.wishlist,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (userProduct) => {
    try {
      const token = localStorage.getItem("token");
      const auth = {
        authorization: token,
      };
      const requestBody = JSON.stringify({ product: userProduct });
      const response = await fetch("/api/user/cart", {
        method: "POST",
        headers: auth,
        body: requestBody,
      });
      if (response.status === 201) {
        const data = await response.json();
        dispatch({ type: "ADD_TO_CART", payload: data.cart });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const addToWishList = async (userProduct) => {
    try {
      const token = localStorage.getItem("token");
      const auth = {
        authorization: token,
      };
      const requestBody = JSON.stringify({ product: userProduct });
      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: auth,
        body: requestBody,
      });
      if (response.status === 201) {
        const data = await response.json();
        dispatch({ type: "ADD_TO_WISHLIST", payload: data.wishlist });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (userProduct) => {
    try {
      const token = localStorage.getItem("token");
      const auth = {
        authorization: token,
      };
      const response = await fetch(`/api/user/cart/${userProduct._id}`, {
        method: "DELETE",
        headers: auth,
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: "ADD_TO_CART", payload: data.cart });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (userProduct) => {
    try {
      const token = localStorage.getItem("token");
      const auth = {
        authorization: token,
      };
      const response = await fetch(`/api/user/wishlist/${userProduct._id}`, {
        method: "DELETE",
        headers: auth,
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: "ADD_TO_WISHLIST", payload: data.cart });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantityCart = async (userProduct, userAction) => {
    try {
      const token = localStorage.getItem("token");
      const auth = {
        authorization: token,
      };
      const requestBody = JSON.stringify({ action: { type: userAction } });
      const response = await fetch(`/api/user/cart/:${userProduct._id}`, {
        method: "POST",
        headers: auth,
        body: requestBody,
      });
      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: "ADD_TO_CART", payload: data.cart });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        addToWishList,
        removeFromCart,
        removeFromWishlist,
        updateQuantityCart,
        cart: cartData.cart,
        wishlist: cartData.wishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
