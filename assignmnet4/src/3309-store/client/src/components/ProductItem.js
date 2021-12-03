import React from "react";

class ProductItem extends React.Component {
  render() {
    //   destructure props
    const { prodName, price, stock, prodStatus, viewCount, category, image } =
      this.props.product;

    //change class based on product status
    const productClass = {
      normal: "item-container",
      unavailable: "item-container out-of-stock",
      sale: "item-container on-sale",
    };

    return (
      <div className={productClass[prodStatus]}>
        {/* details/info about the product */}
        <div className="item-content">
          {/* edit button */}
          <div className="item-header has-text-right">
            <span className="icon edit-button">
              <i class="fa-solid fa-sliders"></i>
            </span>
          </div>
          <div className="item-img-container">
            <div className="on-sale-label">On Sale!</div>
            <div className="out-of-stock-label">Out Of Stock</div>
            <figure className="image is-4by3">
              <img src={image} alt={prodName}></img>
            </figure>
          </div>
          <div className="item-tags">
            <p>
              {stock}
              <span> left in stock</span>
            </p>
            <p>
              {viewCount} <span> views</span>
            </p>
            <p>{category}</p>
          </div>
          <p className="item-name">{prodName}</p>
        </div>
        {/* price + add to shopping cart */}
        <div className="item-footer">
          {/* price */}
          <p className="price">
            <span>&#36;</span>
            <span>{price}</span>
          </p>
          {/* add to cart button*/}
          <button className="item-btn" disabled={prodStatus === "unavailable"}>
            <i className="fas fa-shopping-cart"></i>
            {/* show cancel icon when out of stock */}
            <i className="fas fa-cancel"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ProductItem;
