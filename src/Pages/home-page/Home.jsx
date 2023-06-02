import { useContext, useState } from "react";
import "./Home.css";
import { ProductContext } from "../../Context/ProductContext";
import { Footer } from "../../components/footer-component/Footer";
import { useNavigate } from "react-router";
import { TbTruckReturn } from "react-icons/tb";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import Backdrop from "@mui/material/Backdrop";
import { CartContext } from "../../Context/CartContext";
import { TailSpin } from "react-loader-spinner";
export const Home = () => {
  const { categories } = useContext(ProductContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const { addFilterCategory, clearCategory } = useContext(CartContext);
  const navigate = useNavigate();
  const categoryHandler = (category) => {
    clearCategory();
    addFilterCategory(category);
    navigate("/products");
  };
  return !isLoaded && categories.length === 0 ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <TailSpin
        height="80"
        width="100%"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{ margin: "8rem auto" }}
        wrapperClass=""
        visible={true}
      />
    </Backdrop>
  ) : (
    <>
      <div className="landing-image-container">
        <img
          className="landing-image"
          alt="landing"
          src="https://assets.ajio.com/cms/AJIO/WEB/27052023-UHP-D-Daily-P2-Lifestyle-Upto60.jpg"
          onClick={() => navigate("/products")}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <img
        className="landing-image"
        alt="landing"
        src="https://assets.ajio.com/cms/AJIO/WEB/12052023-D-UHP-Urgency-LastFewHrssf.jpg"
        onClick={() => navigate("/products")}
      />
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

      <div>
        <ul className="feature-home">
          <li>
            <FaHandHoldingHeart />
            <br />
            100% Handpicked
          </li>
          <li>
            <TbTruckReturn />
            <br />
            Easy Exchange
          </li>
          <li>
            <GrStatusGood />
            <br />
            ASSURED QUALITY
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};
