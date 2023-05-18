import "./Filter.css";
export const Filter = () => {
  return (
    <>
      <form className="filter-form">
        <header className="filter-header">
          <h3>Filters</h3>
          <button>Clear</button>
        </header>
        <h3>Price</h3>
        <label className="range-label">
          <span>0</span>
          <span>1000</span>
          <span>2000</span>
        </label>
        <input
          type="range"
          min="0"
          max="2000"
          value="0"
          list="range"
          id="price-range"
        />
        <datalist className="filter-datalist" id="range">
          <option value="0">0</option>
          <option value="1000">1000</option>
          <option value="2000">2000</option>
        </datalist>
        <h3>Category</h3>
        <label>
          <input type="checkbox" name="category" />
          Men Clothing
        </label>
        <label>
          <input type="checkbox" name="category" />
          Women Clothing
        </label>
        <label>
          <input type="checkbox" name="category" />
          Kids Clothing
        </label>
        <h3>Rating</h3>
        <label>
          <input type="radio" name="rating" /> 4 Stars & above
        </label>
        <label>
          <input type="radio" name="rating" /> 3 Stars & above
        </label>
        <label>
          <input type="radio" name="rating" /> 2 Stars & above
        </label>
        <label>
          <input type="radio" name="rating" /> 1 Stars & above
        </label>
        <h3>Sort by</h3>
        <label>
          <input type="radio" name="sortby" /> Price-Low to High
        </label>
        <label>
          <input type="radio" name="sortby" /> Price-High to Low
        </label>
      </form>
    </>
  );
};
