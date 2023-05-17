import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return { ...prevState, cart: [...payload] };
    case "ADD_TO_WISHLIST":
      return { ...prevState, wishlist: [...payload] };
    case "INCREMENT_CART":
      return {
        ...prevState,
        cart: prevState.cart.map((product) =>
          product._id === payload._id
            ? { ...product, qty: product.qty + 1 }
            : product
        ),
      };
    case "DECREMENT_CART":
      return {
        ...prevState,
        cart: prevState.cart.map((product) =>
          product._id === payload._id
            ? { ...product, qty: product.qty - 1 }
            : product
        ),
      };
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
      if (responseCart.status === 200) {
        dispatch({
          type: "ADD_TO_CART",
          payload: responseCart.cart,
        });
      }
      if (responseWishlist.status === 200) {
        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: responseWishlist.wishlist,
        });
      }
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
        console.log(data);
        userAction === "increment"
          ? dispatch({ type: "INCREMENT_CART", payload: userProduct })
          : dispatch({ type: "DECREMENT_CART", payload: userProduct });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCartCount = () => {
    return cartData.cart.length;
  };
  const getWishlistCount = () => {
    return cartData.wishlist.length;
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
        getCartCount,
        getWishlistCount,
        cart: cartData.cart,
        wishlist: cartData.wishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
