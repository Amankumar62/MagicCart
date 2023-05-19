import { useContext } from "react";
import "./Home.css";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router";
import { CartContext } from "../Context/CartContext";
export const Home = () => {
  const { categories } = useContext(ProductContext);
  const { addFilterCategory, clearCategory } = useContext(CartContext);
  const navigate = useNavigate();
  const categoryHandler = (category) => {
    clearCategory();
    addFilterCategory(category);
    navigate("/products");
  };
  return (
    <>
      <section className="category">
        <h2>CATEGORIES TO BAG</h2>
        <ul className="landing-ul">
          {categories.map(
            ({ _id, categoryName, description, categoryImage }) => (
              <li
                onClick={() => categoryHandler(categoryName)}
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
