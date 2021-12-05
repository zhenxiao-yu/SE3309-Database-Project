import React from "react";
import ProductListHeader from "components/ProductListHeader";
import ProductItem from "components/ProductItem";
import CategoryList from "components/CategoryList";
import axios from "utils/axios";
import PopupEditor from "components/PopupEditor";
import AddProduct from "components/AddProduct";

//ProductList component
class ProductList extends React.Component {
  //product list state
  state = {
    // stores the current search results
    products: [],
    // stores the entire product list from database
    originalProducts: [],
  };

  //test (need to parse data from backend)
  products = [
    {
      prodName: "Nintendo Switch",
      price: "321",
      stock: "221",
      prodStatus: "normal",
      viewCount: "3231",
      category: "Electronics",
      image:
        "https://cdn.vox-cdn.com/thumbor/6QTbhbmlSyMwl5E8y1aU4x3cTz8=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/65003327/jbareham_1492_170228_0024.0.0.jpg",
    },
    {
      prodName: "RadMission 1",
      price: "1532",
      stock: "921",
      prodStatus: "normal",
      viewCount: "4212",
      category: "Sports Equipment",
      image:
        "https://cdn.shopify.com/s/files/1/2422/8407/products/RadMission_BlackL_Right_View_2400_600x.jpg?v=1608250772",
    },
    {
      prodName: "Iphone 11",
      price: "1300",
      stock: "32",
      prodStatus: "sale",
      viewCount: "7232",
      category: "Electronics",
      image: "http://cdn.mos.cms.futurecdn.net/ZeSeBrAF8CTw3ztqvYj24S.jpg",
    },
    {
      prodName: "T-shirt",
      price: "23",
      stock: "3222",
      prodStatus: "normal",
      viewCount: "543",
      category: "Clothing",
      image:
        "https://www.shooos.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/2/1/214194_s20_os0261.jpg",
    },
    {
      prodName: "Corner study desk",
      price: "562",
      stock: "673",
      prodStatus: "sale",
      viewCount: "316",
      category: "Furniture",
      image: "https://m.media-amazon.com/images/I/61DDJad6SUL._AC_SL1500_.jpg",
    },
    {
      prodName: "JBL speaker",
      price: "130",
      stock: "0",
      prodStatus: "unavailable",
      viewCount: "3213",
      category: "Electronics",
      image:
        "https://www.lifewire.com/thmb/DCaO15XgBiFhHSIFHhliAoIit08=/fit-in/1000x800/filters:no_upscale():max_bytes(150000):strip_icc()/JBL-Flip-5-8eb0f0a2abb24d7f9c40e2ccbbea89c9.jpg",
    },
  ];

  //fetch data from server
  componentDidMount() {
    axios.get("/products").then((response) => {
      this.setState({
        products: response.data,
        originalProducts: response.data,
      });
    });
  }

  //search for a product
  search = (searchText) => {
    //get new product list array
    let search_products = [...this.state.originalProducts];
    //filter new array
    search_products.filter((product) => {
      // not case sensitive, search by product name
      const result = product.prodName.match(new RegExp(searchText, "gi"));
      return !!result;
    });
    //set state of product
    this.setState({
      products: search_products,
    });
  };

  //open popup editor
  addProduct = () => {
    PopupEditor.showPopup({
      component: AddProduct,
      callBackFunc: data => {
        //when the data is mot empty, add new data to a list of products
        if (data){
          this.add(data);
        }
        console.log('Product Data:', data); //test 
      }
    });
  };

  add = (product) => {
    //add newly created create product to the list
    const _products = [...this.state.products]
    _products.push(product)
    //add newly created create product to the original list
    const _originalProducts = [...this.state.originalProducts]
    _originalProducts.push(product)

    //update current displayed product list and original product list
    this.setState({
      products: _products,
      originalProducts: _originalProducts
    })

  }

  render() {
    return (
      <div>
        {/* pass search function to productList Header (contains search button) */}
        <ProductListHeader search={this.search} />
        <CategoryList />

        <div className="products-container">
          <button
            className="button is-danger popup-btn"
            onClick={this.addProduct}
          >
            + Add Product +
          </button>
          {/* each line has 12 slots */}
          <div className="columns is-multiline is-desktop">
            {/* iterate through all products */}

            {/* !!!!!! use this.state.products.map when database is configured !!!!!*/}
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
