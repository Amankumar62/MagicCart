import { useState } from "react";
import { AddressCard } from "../../components/address-component/AddressCard";
import { PriceCard } from "../../components/price-component/PriceCard";
import "./Checkout.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { AddAddressModal } from "../../components/address-component/AddAddressModal";
export const Checkout = () => {
  const [hideAddress, sethideAddress] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{ display: hideAddress && "none" }}
        className="add-address-form-container"
      >
        <AddAddressModal sethideAddress={sethideAddress} />
      </div>
      <div className="stepper-checkout">
        <h2 className="stepper-checkout-heading">Checkout Page</h2>
        <Stepper>
          <Step completed={true}>
            <StepLabel onClick={() => navigate("/cart")}>
              Add Items to Cart
            </StepLabel>
          </Step>
          <Step completed={true} onClick={() => navigate("/checkout")}>
            <StepLabel>Checkout</StepLabel>
          </Step>
          <Step>
            <StepLabel>Place Order</StepLabel>
          </Step>
        </Stepper>
      </div>
      <div className="checkout-container">
        <div className="address-card">
          <AddressCard hideAddressHandler={sethideAddress} />
          <button
            className="checkout-add-address"
            onClick={() => sethideAddress(false)}
          >
            <AiOutlinePlusCircle />
            Add new Address
          </button>
        </div>
        <div className="price-card">
          <PriceCard />
        </div>
      </div>
    </>
  );
};
