import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./Pages/home-page/Home";
import { ProductListing } from "./Pages/product-listing-page/ProductListing";
import { Cart } from "./Pages/cart-page/Cart";
import { Wishlist } from "./Pages/wishlist-page/Wishlist";
import { Login } from "./Pages/login-page/Login";
import { Signup } from "./Pages/signup-page/Signup";
import { Checkout } from "./Pages/checkout-page/Checkout";
import { Header } from "./components/header-component/Header";
import { Product } from "./Pages/products-page/Product";
import { UserProfile } from "./Pages/userprofile-page/UserProfile";
import { RequireAuth } from "./auth/RequiresAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { MockAPI } from "./Pages/mockbee-pages/MockMan";
import { NotFound } from "./Pages/notfound-page/NotFound";
import { OrderHistory } from "./Pages/order-page/OrderHistory";
import { useEffect } from "react";
import { AddressPage } from "./Pages/userprofile-page/AddressPage";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="App">
      <Header />
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <Wishlist />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/mockman" element={<MockAPI />} />
        <Route
          path="/orders"
          element={
            <RequireAuth>
              <OrderHistory />
            </RequireAuth>
          }
        />
        <Route
          path="/address"
          element={
            <RequireAuth>
              <AddressPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
