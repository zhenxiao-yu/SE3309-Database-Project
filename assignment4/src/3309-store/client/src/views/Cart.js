import React from "react";
import Header from "components/Header";
import CartItemList from "components/CartItemList";


//Cart component
class Cart extends React.Component {
  render() {
    return (
      <div className="App-container">
        <Header username="" />
       <CartItemList/>
      </div>
    );
  }
}

export default Cart;