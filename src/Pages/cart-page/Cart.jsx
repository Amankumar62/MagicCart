import { ProductCardLandscape } from "../../components/product-component/ProductCardLandscape";
import "./Cart.css";
import { PriceCard } from "../../components/price-component/PriceCard";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
export const Cart = () => {
  const { cart } = useContext(CartContext);
  return (
    <>
      <h2 className="cart-heading">
        Your Cart{cart.length === 0 ? "" : `(${cart.length})`}
      </h2>
      <div className="stepper">
        <Stepper>
          <Step completed={cart.length !== 0}>
            <StepLabel>Add Items to Cart</StepLabel>
          </Step>
          <Step>
            <StepLabel>Checkout</StepLabel>
          </Step>
          <Step>
            <StepLabel>Place Order</StepLabel>
          </Step>
        </Stepper>
      </div>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-detail">
          <div className="product-card-landscape-list">
            <ul>
              {cart.map((product) => (
                <li className="product-card-landscape-list-listing">
                  <ProductCardLandscape product={product} />
                </li>
              ))}
            </ul>
          </div>
          <div className="price-card">
            <PriceCard />
          </div>
        </div>
      )}
    </>
  );
};
