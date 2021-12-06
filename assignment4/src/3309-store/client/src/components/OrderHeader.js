import React from "react";
import axios from "utils/axios";
import OrderList from "./OrderList";

class OrderHeader extends React.Component {

    state = {
        orderNum: []
    };
    //fetch data from server
    componentDidMount() {
        if (localStorage.getItem("username")) {
            axios.get(`http://localhost:3001/orderInfo?userID=${localStorage.getItem("userID")}`).then((res) => {
                this.setState({
                    orderNum: res.data,
                });
            });
        }
    }


    render() {
        return (
            <div>
                <div className="order-banner">
                    <div className="order-num">Product Order History</div>
                    <div className="order-date">
                        <div>
                            <select>
                                {this.state.orderNum.map((num) => {
                                    return (
                                        <option>Order Number: {JSON.stringify(num.id)}</option>
                                    );
                                })}
                            </select>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderHeader;