import React from "react";
import ProductListHeader from "components/ProductListHeader";
import ProductItem from "components/ProductItem";
import CategoryList from "components/CategoryList";


//ProductList component
class ProductList extends React.Component {
  render() {
    return (
      <div>
        <ProductListHeader/>
        <CategoryList/>
        <div className="products-container">
          {/* each line has 12 slots */}
          <div className="columns is-multiline is-desktop">
            {/* each column is 3 slots, thus 4 products per line */}
            <div className="column is-3">
              <ProductItem/>
            </div>
            <div className="column is-3">
              <ProductItem/>
            </div>
            <div className="column is-3">
              <ProductItem/>
            </div>
            <div className="column is-3">
              <ProductItem/>
            </div>
            <div className="column is-3">
              <ProductItem/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
