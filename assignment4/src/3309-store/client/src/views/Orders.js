import React from "react";
import Header from "components/Header";
import OrderList from "components/OrderList";

//orders  component
class Orders extends React.Component {

    // let username = localStorage.getItem("username")

    // localStorage.getItem("username")
    // localStorage.get("userID")

    render() {
        return (
            <div className="App-container">
                <Header username="" />
                <h1>ORDERS</h1>
                <OrderList />
            </div>
        );
    }
}

export default Orders;