import React from "react";
import Header from "components/Header";
import CartItemList from "components/CartItemList";

//fetch data from server

//Cart component
class Cart extends React.Component {
  componentDidMount() {
    //redirect to login if not logged in
    if (!localStorage.getItem("username")) {
      this.props.history.push('/login');
    }
  }


  render() {
    return (
      <div className="App-container">
        <Header username="" />
        <CartItemList />
      </div>
    );
  }
}

export default Cart;