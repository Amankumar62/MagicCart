import { createContext, useEffect, useReducer } from "react";
export const ProductContext = createContext();

const productReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_CATEGORY":
      return { ...prevState, categories: [...payload] };
    case "SET_PRODUCT":
      return { ...prevState, products: payload };
    default:
      return { ...prevState };
  }
};

export const ProductProvider = ({ children }) => {
  const [productData, dispatch] = useReducer(productReducer, {
    categories: [],
    products: [],
  });
  console.log(productData);
  const getProductData = async () => {
    try {
      const categoryData = await (await fetch("/api/categories")).json();
      const productData = await (await fetch("/api/products")).json();
      dispatch({ type: "SET_CATEGORY", payload: categoryData.categories });
      dispatch({ type: "SET_PRODUCT", payload: productData.products });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products: productData.products,
        categories: productData.categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};