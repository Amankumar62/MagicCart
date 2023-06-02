import { useContext, useEffect, useState } from "react";
import "./ProductListing.css";
import { Filter } from "../../components/filter-component/Filter";
import { ProductCard } from "../../components/product-component/ProductCard";
import { AiFillFilter } from "react-icons/ai";
import { ProductContext } from "../../Context/ProductContext";
import { CartContext } from "../../Context/CartContext";
import { TailSpin } from "react-loader-spinner";
import Drawer from "@mui/material/Drawer";
import Backdrop from "@mui/material/Backdrop";
export const ProductListing = () => {
  const { products } = useContext(ProductContext);
  const { filter } = useContext(CartContext);

  const [showFilter, setShowFilter] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

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

    let filteredSearch = filteredSorted.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    return filteredSearch;
  };

  const displayProduct = applyFilter();
  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      <aside>
        <Filter />
      </aside>
      <Drawer
        anchor={"bottom"}
        open={showFilter}
        onClose={() => setShowFilter(!showFilter)}
        className="show-filter"
      >
        <Filter />
      </Drawer>

      {showLoader ? (
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
        <section className="listing">
          <h3 className="listing-heading">
            Showing All products
            <span className="product-count">
              ( Showing {displayProduct.length} products )
            </span>
          </h3>
          <button
            className="filter-mobile-view-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            <AiFillFilter />
          </button>
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
