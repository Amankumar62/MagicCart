import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ProductListing } from "./Pages/ProductListing";
import { Cart } from "./Pages/Cart";
import { Wishlist } from "./Pages/Wishlist";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { Checkout } from "./Pages/Checkout";
import { Header } from "./components/header-component/Header";
import { Product } from "./Pages/Product";
import { UserProfile } from "./Pages/UserProfile";
import { RequireAuth } from "./auth/RequiresAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { MockAPI } from "./Pages/MockMan";
import { NotFound } from "./Pages/NotFound";

function App() {
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
