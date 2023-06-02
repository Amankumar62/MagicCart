import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export const AddAddressModal = ({ sethideAddress }) => {
  const { addAddressHandler } = useContext(AuthContext);
  return (
    <>
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
          min="100000"
          max="999999"
          placeholder="enter pin code"
        />
        <label htmlFor="mobileno">mobile</label>
        <input
          id="mobileno"
          type="number"
          required={true}
          min="1000000000"
          max="9999999999"
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
    </>
  );
};
