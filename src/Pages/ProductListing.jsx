import "./ProductListing.css";
import { Filter } from "../components/Filter";
import { ProductCard } from "../components/ProductCard";
export const ProductListing = () => {
  return (
    <>
      <aside>
        <Filter />
      </aside>
      <section className="listing">
        <h3 className="listing-heading">
          Showing All products
          <span className="product-count"> ( Showing 20 products )</span>
        </h3>
        <ul>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
        </ul>
      </section>
    </>
  );
};
