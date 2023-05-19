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
    case "FILTER_CATEGORY":
      return {
        ...prevState,
        filter: {
          ...prevState.filter,
          category: prevState.filter.category.find((name) => name === payload)
            ? prevState.filter.category.filter((name) => name !== payload)
            : [...prevState.filter.category, payload],
        },
      };
    case "FILTER_RATING":
      return {
        ...prevState,
        filter: { ...prevState.filter, userRating: payload },
      };
    case "FILTER_SORTBY":
      return { ...prevState, filter: { ...prevState.filter, sortby: payload } };
    case "FILTER_QUERY":
      return {
        ...prevState,
        filter: { ...prevState.filter, searchQuery: payload },
      };
    case "FILTER_PRICE":
      return { ...prevState, filter: { ...prevState.filter, price: payload } };
    case "CLEAR_CATEGORY":
      return { ...prevState, filter: { ...prevState.filter, category: [] } };
    case "CLEAR_FILTER":
      return {
        ...prevState,
        filter: {
          ...prevState.filter,
          category: [],
          userRating: null,
          sortby: null,
          price: 2000,
        },
      };
    default:
      return prevState;
  }
};

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
  console.log(cartData.filter.searchQuery);
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
        dispatch({ type: "ADD_TO_WISHLIST", payload: data.wishlist });
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
