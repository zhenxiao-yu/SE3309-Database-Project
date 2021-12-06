import React from "react";
import axios from "utils/axios";

class CartItem extends React.Component {
  //open  product editor window method
  numChanged = () => {};

  removeItem = () => {
    axios
      .get(
        `http://localhost:3001/removeCartItem?userID=${localStorage.getItem(
          "userID"
        )}&prodID=${this.props.product.id}`
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      });
  };

  render() {
    //   destructure props
    const {
      //id,
      prodName,
      //sellerID,
      //subtitle,
      image,
      descr,
      price,
      stock,
      prodStatus,
      viewCount,
      category,
    } = this.props.product;

    //change class based on product status
    const productClass = {
      normal: "item-container",
      unavailable: "item-container out-of-stock",
      sale: "item-container on-sale",
    };

    //change database value to frontend product status
    const statusConverter = (prodStatus) => {
      if (prodStatus === "Normal") {
        return "normal";
      } else if (prodStatus === "Out of Stock") {
        return "unavailable";
      } else if (prodStatus === "On Sale") {
        return "sale";
      }
    };

    return (
      <div className={productClass[statusConverter(prodStatus)]}>
        {/* details/info about the product */}
        <div className="item-content">
          {/* edit button */}
          <div className="item-header has-text-right" onClick={this.numChanged}>
            <select name="#" id="#">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="item-img-container">
            <div className="on-sale-label">On Sale!</div>
            <div className="out-of-stock-label">Out Of Stock</div>
            <figure className="image is-4by3 test-image">
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
            <p>
              <strong>About: </strong>
              {descr}
            </p>
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
          <button className="remove-btn" onClick={this.removeItem}>
            {/* show cancel icon when out of stock */}
            <i className="fas fa-cancel"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default CartItem;
