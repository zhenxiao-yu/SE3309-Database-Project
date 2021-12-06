import React from "react";
import axios from "utils/axios";
import OrderList from "./OrderList";

class OrderHeader extends React.Component {

    //fetch data from server
    componentDidMount() {
        if (localStorage.getItem("username")) {
            axios.get(`http://localhost:3001/orderInfo?userID=${localStorage.getItem("userID")}`).then((res) => {
                this.props({
                    orderNum: res.data.orderID,
                    orderDate: res.data.createTime
                });
            });

        }
    }

    render() {
        const {
            orderNo,
            orderDate
        } = this.props.order

        return (
            <div className="order-banner">
                <div className="order-num">{orderNo}</div>
                <div className="order-date">{orderDate}</div>
            </div>
        )
    }
}

export default OrderHeader;