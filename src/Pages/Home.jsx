import { useContext } from "react";
import "./Home.css";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router";
export const Home = () => {
  const { categories } = useContext(ProductContext);
  const navigate = useNavigate();
  return (
    <>
      <section className="category">
        <h2>CATEGORIES TO BAG</h2>
        <ul className="landing-ul">
          {categories.map(
            ({ _id, categoryName, description, categoryImage }) => (
              <li
                onClick={() => navigate("/products")}
                key={_id}
                style={{ backgroundImage: `url(${categoryImage})` }}
              >
                <h2 className="category-text">{categoryName}</h2>
                <p className="category-text">Check out our {description}</p>
              </li>
            )
          )}
        </ul>
      </section>
      <div className="landing-image-container">
        <img
          className="landing-image"
          alt="landing"
          src={require("../Images/3588601.jpg")}
        />
      </div>
    </>
  );
};
