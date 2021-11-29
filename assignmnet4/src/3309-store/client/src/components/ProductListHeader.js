import React from "react";

class ProductListHeader extends React.Component {
  render() {
    return (
      <div className="products-header">
        {/* store title */}
        <div className="store-name">3309 Store</div>
        {/* search area */}
        <div className="search-window">
          <div className="field has-addons">
            {/* search bar */}
            <div className="control">
              <input type="text" className="input search-bar" placeholder="Search"/>
            </div>
            {/* clear button */}
            <div className="control">
              <button className="button">
                <i className="fa fa-cancel"></i>
              </button>
            </div>
          </div>
        </div>
        {/* shopping cart */}
        <div className="cart-div">
            {/* icon */}
            <i className="fa fa-shopping-cart"></i>
            {/* current number of items in cart */}
            <span className="cart-amount">(0)</span>
        </div>
      </div>
    );
  }
}

export default ProductListHeader;
