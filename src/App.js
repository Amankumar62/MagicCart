import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ProductListing } from "./Pages/ProductListing";
import { Cart } from "./Pages/Cart";
import { Wishlist } from "./Pages/Wishlist";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { Checkout } from "./Pages/Checkout";
import { Header } from "./components/Header";
import "./App.css";
import { MockAPI } from "./Pages/MockMan";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mockman" element={<MockAPI />} />
      </Routes>
    </div>
  );
}

export default App;
