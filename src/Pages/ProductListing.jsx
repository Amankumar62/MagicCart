import "./ProductListing.css";
import { ProductCard } from "../components/ProductCard";
export const ProductListing = () => {
  return (
    <>
      <aside>
        <form>
          <h3>Filters</h3>
        </form>
      </aside>
      <section className="listing">
        <h3>
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
