import React from "react";
import axios from "utils/axios";
import OrderList from "./OrderList";

class OrderHeader extends React.Component {

    state = {
        orderDate: []
    };
    //fetch data from server
    componentDidMount() {
        if (localStorage.getItem("username")) {
            axios.get(`http://localhost:3001/orderDate?userID=${localStorage.getItem("userID")}`).then((res) => {
                this.setState({
                    orderDate: res.data

                });
            });
        }
    }

    addDropDown = () => {
        let list = [];
        return list;
    }


    render() {
        return (
            <div>
                <div className="order-banner">
                    <div className="order-num">Product Order History</div>
                    <div className="order-date">
                        Order again from:
                        
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderHeader;