import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_CART":
      return { ...prevState, cart: [...payload] };
    case "SET_WISHLIST":
      return { ...prevState, wishlist: [...payload] };
    case "ADD_TO_CART":
    case "ADD_TO_WISHLIST":
    case "REMOVE_FROM_CART":
    case "REMOVE_FROM_WISHLIST":
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
        type: "SET_CART",
        payload: responseCart.cart,
      });
      dispatch({
        type: "SET_WISHLIST",
        payload: responseWishlist.wishlist,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = () => {};
  const addToWishList = () => {};
  useEffect(() => {
    getCartData();
  }, []);

  return <CartContext.Provider>{children}</CartContext.Provider>;
};
