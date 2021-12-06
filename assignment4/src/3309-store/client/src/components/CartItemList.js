import React from "react";
import axios from "utils/axios";
import CartItem from "./CartItem";
import PopupEditor from "./PopupEditor"
import Checkout from "./Checkout";


class CartItemList extends React.Component {

    state = {
        // stores the cart items
        cartItems: [],
    };

    
    checkout = () => {
        PopupEditor.open({
            component: Checkout,
            callback: () => {},
          });
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
                                    <CartItem product={item} />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className="button is-danger popup-btn"
                        onClick={this.checkout}
                    >
                        CHECKOUT
                    </button>
                </div>
            </div>
        );
    }
}

export default CartItemList;