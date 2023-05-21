import { useContext } from "react";
import "./ProductListing.css";
import { Filter } from "../components/Filter";
import { ProductCard } from "../components/ProductCard";
import { ProductContext } from "../Context/ProductContext";
import { CartContext } from "../Context/CartContext";
import { TailSpin } from "react-loader-spinner";
export const ProductListing = () => {
  const { products } = useContext(ProductContext);
  const { filter } = useContext(CartContext);

  const sortOrder = (order) => {
    if (order === "LTH")
      return (a, b) => a.discounted_price - b.discounted_price;
    else return (a, b) => b.discounted_price - a.discounted_price;
  };

  const applyFilter = () => {
    const { category, userRating, sortby, searchQuery, price } = filter;
    let filteredCategory = products;
    if (category.length !== 0) {
      filteredCategory = products.filter(({ category_name }) =>
        category.includes(category_name)
      );
    }
    let filteredRating = filteredCategory;
    if (userRating) {
      filteredRating = filteredCategory.filter(
        ({ rating }) => rating >= userRating
      );
    }
    let filteredPrice = filteredRating.filter(
      ({ discounted_price }) => discounted_price <= price
    );

    let filteredSorted = filteredPrice;
    if (sortby) {
      filteredSorted = filteredPrice.sort(sortOrder(sortby));
    }

    let filteredSearch = filteredSorted.filter(({ title }) =>
      title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    return filteredSearch;
  };

  const displayProduct = applyFilter();

  return (
    <>
      <aside>
        <Filter />
      </aside>
      {products.length === 0 ? (
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
      ) : (
        <section className="listing">
          <h3 className="listing-heading">
            Showing All products
            <span className="product-count">
              ( Showing {displayProduct.length} products )
            </span>
          </h3>
          {displayProduct.length === 0 ? (
            <p className="empty-productlist">No products to display</p>
          ) : (
            <ul className="product-card-li">
              {displayProduct.map((product) => (
                <li key={product._id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
};
