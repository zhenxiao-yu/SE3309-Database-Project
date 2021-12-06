import React from "react";
import axios from "utils/axios";
import ProductItem from "components/ProductItem";


class CartItemList extends React.Component {

    state = {
        // stores the cart items
        cartItems: [],
    };

    componentDidMount() {
        if (localStorage.getItem("username")) {
            axios.get(`http://localhost:3001/cart?userID=${localStorage.getItem("userID")}`).then((res) => {
                this.setState({
                    cartItems: res.data
                });
            });
        }
    }


    
  render() {
    return (
      <div>
        <div className="products-container">
          {/* each line has 12 slots */}
          <div className="columns is-multiline is-desktop">

            {/* iterate through the advertisements */}
            {this.state.cartItems.map((item) => {
              return (
                // each column is 3 slots, thus 4 products per line
                <div className="column is-3" key={item.id}>
                  <ProductItem product={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CartItemList;