import React from "react";
import Header from "components/Header";
import OrderList from "components/OrderList";

//orders  component
class Orders extends React.Component {
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
                <h1>ORDERS</h1>
                <OrderList />
            </div>
        );
    }
}

export default Orders;