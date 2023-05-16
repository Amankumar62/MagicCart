import { useContext } from "react";
import "./Home.css";
import { ProductContext } from "../Context/ProductContext";
export const Home = () => {
  const { categories } = useContext(ProductContext);
  return (
    <>
      <section className="category">
        <h2>CATEGORIES TO BAG</h2>
        <ul className="landing-ul">
          {categories.map(
            ({ _id, categoryName, description, categoryImage }) => (
              <li
                key={_id}
                style={{ backgroundImage: `url(${categoryImage})` }}
              >
                <h2>{categoryName}</h2>
                <p>Check out our {description}</p>
              </li>
            )
          )}
        </ul>
      </section>
      <img className="landing-image" src={require("../Images/3588601.jpg")} />
      <section className="offers">
        <h2>Offers</h2>
        <ul className="landing-offer-ul">
          <li>10%</li>
          <li>20%</li>
        </ul>
      </section>
    </>
  );
};
