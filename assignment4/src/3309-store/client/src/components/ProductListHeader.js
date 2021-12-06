import React from "react";

class ProductListHeader extends React.Component {
  state = {
    searchValue: "",
  };

  //sync searchValue wth whats entered in the box
  handleSearchChange = (event) => {
    const text = event.target.value;
    this.setState({
      searchValue: text,
    });
    this.props.search(text);
  };

  //Clear text
  handleClear = () => {
    this.setState({
      searchValue: "",
    });
    this.props.search("");
  };

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
              <input
                type="text"
                className="input search-bar"
                placeholder="Search product..."
                value={this.state.searchValue}
                onChange={this.handleSearchChange}
              />
            </div>
            {/* clear button */}
            <div className="control">
              <button
                className="button"
                title="Clear"
                onClick={this.handleClear}
              >
                <i className="fa fa-eraser"></i>
              </button>
            </div>
          </div>
        </div>
        {/* shopping cart */}
        <div className="cart-div">
          {/* icon */}
          <a href ="/cart">
          <button><i className="fa fa-shopping-cart"></i></button>
          {/* current number of items in cart */}
          <span className="cart-amount"></span>
          </a>
        </div>
      </div>
    );
  }
}

export default ProductListHeader;
