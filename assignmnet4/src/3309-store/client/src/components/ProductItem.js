import React from 'react'

class ProductItem extends React.Component {
    render() {
        return (
            <div className="item-container">
                {/* details/info about the product */}
                <div className="item-content">
                    <div className="item-img-container">
                        <figure className="image is-4by3">
                            <img src="https://cdn.vox-cdn.com/thumbor/6QTbhbmlSyMwl5E8y1aU4x3cTz8=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/65003327/jbareham_1492_170228_0024.0.0.jpg" alt=""></img>
                        </figure>
                        <div className="item-tags">
                            <p>13 in left stock</p>
                            <p>546 views</p>
                            <p>Electronics</p>
                        </div>
                        <p className="item-name">Nintendo Switch</p>
                    </div>
                </div>
                {/* price + add to shopping cart */}
                <div className="item-footer">
                    {/* price */}
                    <p className="price">
                        <span>&#36;</span>
                        <span>400</span>
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