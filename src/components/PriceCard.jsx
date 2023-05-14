import "./PriceCard.css";
export const PriceCard = () => {
  return (
    <>
      <h3>Price details</h3>
      <hr />
      <section>
        <ul className="price-detail-list">
          <li>
            <span>Price(1 item)</span>
            <span className="price">2000</span>
          </li>
          <li>
            <span>Discount</span>
            <span>
              -<span className="price"></span>1000
            </span>
          </li>
          <li>
            <span>Delivery Charges</span>
            <span className="price">499</span>
          </li>
          <hr />
          <li className="total-price">
            <span>Total amount</span>
            <span className="price">2499</span>
          </li>
        </ul>
      </section>
      <hr />
      <p className="saving-info">You will save 1000 on this order</p>
      <button className="btn-place-order">Place Order</button>
    </>
  );
};
