import React from "react";
import ProductListHeader from "components/ProductListHeader";
import ProductItem from "components/ProductItem";
import CategoryList from "components/CategoryList";

//ProductList component
class ProductList extends React.Component {
  //product list state
  state = {
    products: [],
  };

  //test (need to parse data from backend)
  products = [
    {
      prodName: "Nintendo Switch",
      price: "321",
      stock: "221",
      prodStatus: "Normal",
      viewCount: "3231",
      category: "Electronics",
      image:
        "https://cdn.vox-cdn.com/thumbor/6QTbhbmlSyMwl5E8y1aU4x3cTz8=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/65003327/jbareham_1492_170228_0024.0.0.jpg",
    },
    {
      prodName: "RadMission 1",
      price: "1532",
      stock: "921",
      prodStatus: "Normal",
      viewCount: "4212",
      category: "Sports Equipment",
      image:
        "https://cdn.shopify.com/s/files/1/2422/8407/products/RadMission_BlackL_Right_View_2400_600x.jpg?v=1608250772",
    },
    {
      prodName: "Iphone 11",
      price: "1300",
      stock: "32",
      prodStatus: "Sale",
      viewCount: "7232",
      category: "Electronics",
      image:
        "http://cdn.mos.cms.futurecdn.net/ZeSeBrAF8CTw3ztqvYj24S.jpg",
    },
    {
      prodName: "T-shirt",
      price: "23",
      stock: "3222",
      prodStatus: "Normal",
      viewCount: "543",
      category: "Clothing",
      image:
        "https://www.shooos.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/2/1/214194_s20_os0261.jpg",
    },
    {
      prodName: "Corner study desk",
      price: "562",
      stock: "673",
      prodStatus: "Sale",
      viewCount: "316",
      category: "Furniture",
      image: "https://m.media-amazon.com/images/I/61DDJad6SUL._AC_SL1500_.jpg",
    },
    {
      prodName: "JBL speaker",
      price: "130",
      stock: "0",
      prodStatus: "Unavailable",
      viewCount: "3213",
      category: "Electronics",
      image: "https://www.lifewire.com/thmb/DCaO15XgBiFhHSIFHhliAoIit08=/fit-in/1000x800/filters:no_upscale():max_bytes(150000):strip_icc()/JBL-Flip-5-8eb0f0a2abb24d7f9c40e2ccbbea89c9.jpg",
    }
  ];

  render() {
    return (
      <div>
        <ProductListHeader />
        <CategoryList />
        <div className="products-container">
          {/* each line has 12 slots */}
          <div className="columns is-multiline is-desktop">
            {/* iterate through all products */}
            {this.products.map((product) => {
              return (
                // each column is 3 slots, thus 4 products per line
                <div className="column is-3" key={product.prodName}>
                  <ProductItem product={product} />
                </div>
              );
            })}

          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
