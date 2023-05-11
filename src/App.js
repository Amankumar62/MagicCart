import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Products } from "./Products";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Checkout } from "./Checkout";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
