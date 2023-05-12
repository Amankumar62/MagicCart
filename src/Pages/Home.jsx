import "./Home.css";
export const Home = () => {
  return (
    <>
      <section className="category">
        <h2>Categories</h2>
        <ul>
          <li>Mens</li>
          <li>Women</li>
          <li>Kids</li>
          <li>accessories</li>
        </ul>
      </section>
      <img src={require("../Images/3588601.jpg")} />
      <section className="offers">
        <h2>Offers</h2>
        <ul>
          <li>10%</li>
          <li>20%</li>
        </ul>
      </section>
    </>
  );
};
