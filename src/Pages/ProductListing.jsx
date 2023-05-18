import { useContext } from "react";
import "./ProductListing.css";
import { Filter } from "../components/Filter";
import { ProductCard } from "../components/ProductCard";
import { ProductContext } from "../Context/ProductContext";
export const ProductListing = () => {
  const { products } = useContext(ProductContext);

  return (
    <>
      <aside>
        <Filter />
      </aside>
      <section className="listing">
        <h3 className="listing-heading">
          Showing All products
          <span className="product-count">
            ( Showing {products.length} products )
          </span>
        </h3>
        <ul className="product-card-li">
          {products.map((product) => (
            <li key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
