import React from 'react'

class ProductItem extends React.Component {
    render() {
        const {prodName, price, stock, prodStatus, viewCount, category, image} = this.props.product;
        return (
            <div className="item-container">
                {/* details/info about the product */}
                <div className="item-content">
                    <div className="item-img-container">
                        <figure className="image is-4by3">
                            <img src={image} alt={prodName}></img>
                        </figure>
                        <div className="item-tags">
                            <p>{stock}<span> left in stock</span></p>
                            <p>{viewCount} <span> views</span></p>
                            <p>{category}</p>
                        </div>
                        <p className="item-name">{prodName}</p>
                    </div>
                </div>
                {/* price + add to shopping cart */}
                <div className="item-footer">
                    {/* price */}
                    <p className="price">
                        <span>&#36;</span>
                        <span>{price}</span>
                    </p>
                    {/* add to cart */}
                    <button className="item-btn">
                        <i className="fas fa-shopping-cart"></i>
                        {/* show cancel icon when out of stock */}
                        <i className="fas fa-cancel"></i>
                    </button>

                </div>
            </div>
        )
    }
}

export default ProductItem;