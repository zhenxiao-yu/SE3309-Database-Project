import React from "react";
import ProductListHeader from "components/ProductListHeader";
import ProductItem from "components/ProductItem";


//ProductList component
class ProductList extends React.Component {
  render() {
    return (
      <div>
        <ProductListHeader/>
        <div className="products-container">
          <ProductItem/>
          <ProductItem/>
          <ProductItem/>
          <ProductItem/>
          <ProductItem/>
        </div>
      </div>
    );
  }
}

export default ProductList;
