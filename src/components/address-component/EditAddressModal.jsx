import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export const EditAddressModal = ({ addressItemId, setEditAddress }) => {
  const { updateAddressHandler, getAddressData } = useContext(AuthContext);
  const addressItem = getAddressData(addressItemId);
  return (
    <>
      <form
        onSubmit={(e) => {
          updateAddressHandler(e, addressItemId);
          setEditAddress(false);
        }}
        className="add-address-form"
      >
        <h3>EDIT ADDRESS</h3>
        <label htmlFor="editaddressname">Name</label>
        <input
          id="editaddressname"
          type="text"
          defaultValue={addressItem?.name}
          placeholder="enter name"
          required={true}
          pattern="^[A-Za-z\s]+$"
        />
        <label htmlFor="editpincode">Pin Code</label>
        <input
          id="editpincode"
          type="number"
          defaultValue={addressItem?.pincode}
          required={true}
          pattern="^[1-9]{6}"
          placeholder="enter pin code"
        />
        <label htmlFor="editmobileno">mobile</label>
        <input
          id="editmobileno"
          type="number"
          defaultValue={addressItem?.mobile}
          required={true}
          pattern="^(\+\d{1,3}[- ]?)?\d{10}$"
          placeholder="enter mobile number"
        />
        <label htmlFor="editaddress">address</label>
        <textarea
          col={5}
          id="editaddress"
          type="text"
          defaultValue={addressItem?.user_address}
          required={true}
          placeholder="New Delivery Address Here"
        ></textarea>
        <button type="submit" className="btn-add-address">
          Update
        </button>
        <button
          type="button"
          className="btn-cancel-address"
          onClick={() => setEditAddress(false)}
        >
          Cancel
        </button>
      </form>
    </>
  );
};
