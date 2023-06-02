import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer/reducer";
import { AuthContext } from "./AuthContext";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, dispatch] = useReducer(cartReducer, {
    cart: [],
    wishlist: [],
    filter: {
      category: [],
      userRating: null,
      sortby: null,
      searchQuery: "",
      price: 2000,
    },
  });

  const { isLoggedIn } = useContext(AuthContext);

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
      if (responseCart?.cart) {
        dispatch({
          type: "SET_CART",
          payload: responseCart?.cart,
        });
      }
      if (responseWishlist?.wishlist) {
        dispatch({
          type: "SET_WISHLIST",
          payload: responseWishlist?.wishlist,
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
        dispatch({ type: "ADD_TO_CART", payload: userProduct });
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
        dispatch({ type: "ADD_TO_WISHLIST", payload: userProduct });
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
        dispatch({ type: "REMOVE_CART", payload: userProduct });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeMultipleFromCart = (cartArray) => {
    cartArray.forEach((item) => {
      removeFromCart(item);
    });
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
        dispatch({ type: "ADD_TO_WISHLIST", payload: userProduct });
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

  const getTotalPrice = () => {
    return cartData.cart.reduce(
      (acc, { discounted_price, qty }) => acc + Number(discounted_price) * qty,
      0
    );
  };

  const getTotalDiscount = () => {
    return (
      cartData.cart.reduce(
        (acc, { price, qty }) => acc + Number(price) * qty,
        0
      ) - getTotalPrice()
    );
  };

  const isProductInCart = (productId) => {
    return cartData.cart.find(({ _id }) => _id === productId);
  };

  const isProductInWihlist = (productId) => {
    return cartData.wishlist.find(({ _id }) => _id === productId);
  };

  const toggleWishlist = (userProduct) => {
    isProductInWihlist(userProduct._id)
      ? removeFromWishlist(userProduct)
      : addToWishList(userProduct);
  };

  const addFilterCategory = (category) => {
    dispatch({ type: "FILTER_CATEGORY", payload: category });
  };

  const addFilterRange = (e) => {
    dispatch({ type: "FILTER_PRICE", payload: Number(e.target.value) });
  };

  const addFilterRating = (e) => {
    if (e.target.checked) {
      dispatch({ type: "FILTER_RATING", payload: Number(e.target.value) });
    }
  };

  const addFilterSortby = (e) => {
    if (e.target.checked) {
      dispatch({ type: "FILTER_SORTBY", payload: e.target.value });
    }
  };

  const addFilterQuery = (e) => {
    dispatch({ type: "FILTER_QUERY", payload: e.target.value });
  };

  const clearFilter = (e) => {
    dispatch({ type: "CLEAR_FILTER", payload: {} });
    e.preventDefault();
  };
  const clearCategory = () => {
    dispatch({ type: "CLEAR_CATEGORY", payload: [] });
  };
  const resetCartContext = () => {
    dispatch({ type: "RESET_CART_WISHLIST", payload: [] });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART", payload: [] });
  };
  useEffect(() => {
    getCartData();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        addToWishList,
        removeFromCart,
        removeMultipleFromCart,
        removeFromWishlist,
        updateQuantityCart,
        getCartCount,
        resetCartContext,
        clearCart,
        toggleWishlist,
        getWishlistCount,
        getTotalPrice,
        getTotalDiscount,
        isProductInCart,
        isProductInWihlist,
        addFilterCategory,
        addFilterRange,
        addFilterRating,
        addFilterSortby,
        addFilterQuery,
        clearFilter,
        clearCategory,
        cart: cartData.cart,
        wishlist: cartData.wishlist,
        range: cartData.filter.price,
        filter: cartData.filter,
        searchQuery: cartData.filter.searchQuery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
