export const userReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...prevState,
        isLoggedIn: true,
        user: payload.foundUser,
        token: payload.encodedToken,
        orderHistory: [],
      };
    case "SIGNUP_SUCCESS":
      return {
        ...prevState,
        isLoggedIn: false,
        orderHistory: [],
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
      return {
        ...prevState,
        address: prevState.address.filter(({ id }) => id !== payload),
      };
    case "UPDATE_ADDRESS":
      return {
        ...prevState,
        address: [
          payload,
          ...prevState.address.filter(({ id }) => id !== payload.id),
        ],
      };
    case "ADD_ORDER":
      console.log(payload);
      return {
        ...prevState,
        orderHistory: [...prevState.orderHistory, payload],
      };
    default:
      return prevState;
  }
};

//cart reducer

export const cartReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_CART":
      return { ...prevState, cart: [...payload] };
    case "SET_WISHLIST":
      return { ...prevState, wishlist: [...payload] };
    case "ADD_TO_CART":
      return {
        ...prevState,
        cart: prevState.cart.find(({ _id }) => _id === payload._id)
          ? prevState.cart.filter(({ _id }) => payload._id !== _id)
          : [...prevState.cart, { ...payload, qty: 1 }],
      };
    case "ADD_TO_WISHLIST":
      return {
        ...prevState,
        wishlist: prevState.wishlist.find(({ _id }) => _id === payload._id)
          ? prevState.wishlist.filter(({ _id }) => payload._id !== _id)
          : [...prevState.wishlist, payload],
      };
    case "REMOVE_CART":
      return {
        ...prevState,
        cart: prevState.cart.filter(({ _id }) => _id !== payload._id),
      };
    case "RESET_CART_WISHLIST":
      return {
        ...prevState,
        cart: [],
        wishlist: [],
        filter: {
          category: [],
          userRating: null,
          sortby: null,
          searchQuery: "",
          price: 2000,
        },
      };
    case "CLEAR_CART":
      return { ...prevState, cart: [] };
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
          product._id === payload._id && product.qty !== 1
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

//product reducer
export const productReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_CATEGORY":
      return { ...prevState, categories: [...payload] };
    case "SET_PRODUCT":
      return { ...prevState, products: payload };
    default:
      return { ...prevState };
  }
};
