import { useState } from "react";
import { AddressCard } from "../../components/address-component/AddressCard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./AddressPage.css";
import { AddAddressModal } from "../../components/address-component/AddAddressModal";
export const AddressPage = () => {
  const [hideAddress, sethideAddress] = useState(true);
  return (
    <>
      <div
        style={{ display: hideAddress && "none" }}
        className="add-address-form-container"
      >
        <AddAddressModal sethideAddress={sethideAddress} />
      </div>
      <div className="address-container">
        <AddressCard />
        <button
          className="checkout-add-address"
          onClick={() => sethideAddress(false)}
        >
          <AiOutlinePlusCircle />
          Add new Address
        </button>
      </div>
    </>
  );
};
