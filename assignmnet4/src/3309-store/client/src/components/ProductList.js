import React from "react";
import ProductListHeader from "components/ProductListHeader";
import ProductItem from "components/ProductItem";
import CategoryList from "components/CategoryList";





//ProductList component
class ProductList extends React.Component {

  //product item attributes

  product = {
    prodName: 'Nintendo Switch',
    price:'400',
    stock:'123',
    prodStatus:'Normal',
    viewCount:'316',
    category:'Electronics',
    image:'https://cdn.vox-cdn.com/thumbor/6QTbhbmlSyMwl5E8y1aU4x3cTz8=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/65003327/jbareham_1492_170228_0024.0.0.jpg'
  }

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
              <ProductItem product={this.product}/>
            </div>
            {/* test */}
            <div className="column is-3">
              <ProductItem product={this.product}/>
            </div>
            <div className="column is-3">
              <ProductItem product={this.product}/>
            </div>
            <div className="column is-3">
              <ProductItem product={this.product}/>
            </div>
            <div className="column is-3">
              <ProductItem product={this.product}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
