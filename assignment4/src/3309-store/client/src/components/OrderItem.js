import React from "react";

class OrderItem extends React.Component {

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
                    <div
                        className="item-header has-text-right"
                        onClick={this.editProduct}
                    >
                        <span className="icon edit-button">
                            <i class="fa-solid fa-sliders"></i>
                        </span>
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
                        <p><strong>About: </strong>{descr}</p>
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
                    <button className="item-btn" disabled={statusConverter(prodStatus) === "unavailable"} onClick={this.addToCart}>
                        <i className="fas fa-shopping-cart"></i>
                        {/* show cancel icon when out of stock */}
                        <i className="fas fa-cancel"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default OrderItem;