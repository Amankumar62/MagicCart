import { useContext, useState } from "react";
import { AddressCard } from "../components/address-component/AddressCard";
import { PriceCard } from "../components/price-component/PriceCard";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { AuthContext } from "../Context/AuthContext";
export const Checkout = () => {
  const [hideAddress, sethideAddress] = useState(true);
  const navigate = useNavigate();
  const { addAddressHandler } = useContext(AuthContext);
  return (
    <>
      <div
        style={{ display: hideAddress && "none" }}
        className="add-address-form-container"
      >
        <form
          onSubmit={(e) => {
            addAddressHandler(e);
            sethideAddress(true);
          }}
          className="add-address-form"
        >
          <h3>ADD NEW ADDRESS</h3>
          <label htmlFor="addressname">Name</label>
          <input
            id="addressname"
            type="text"
            placeholder="enter name"
            required={true}
            pattern="^[a-zA-Z\s]+$"
          />
          <label htmlFor="pincode">Pin Code</label>
          <input
            id="pincode"
            type="number"
            required={true}
            pattern="^[0-9]{6}+$"
            placeholder="enter pin code"
          />
          <label htmlFor="mobileno">mobile</label>
          <input
            id="mobileno"
            type="number"
            required={true}
            pattern="^[0-9]{10}+$"
            placeholder="enter mobile number"
          />
          <label htmlFor="address">address</label>
          <textarea
            col={5}
            id="address"
            type="text"
            required={true}
            placeholder="New Delivery Address Here"
          ></textarea>
          <button type="submit" className="btn-add-address">
            Add Address
          </button>
          <button
            type="button"
            className="btn-cancel-address"
            onClick={() => sethideAddress(true)}
          >
            Cancel
          </button>
        </form>
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
        </div>
        <div className="price-card">
          <PriceCard />
        </div>
      </div>
    </>
  );
};
