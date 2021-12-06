import React from "react";
import axios from "utils/axios";

class OrderHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderNum: [],
            selectValue: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

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

    handleChange(e) {
        this.setState({ selectValue: e.target.value });
    }

    addToCart = () => {
        axios.get(
                `http://localhost:3001/addOrderCart?userID=${localStorage.getItem("userID")}&orderNum=${this.state.selectValue}`
            )
            .then((res) => {
                console.log(res.data);
                window.location.reload(false);
            });

    };

    render() {
        return (
            <div>
                <div className="order-banner">
                    <div className="order-num">Product Order History</div>
                    <div className="order-date">
                        <div>
                            <select onChange={this.handleChange}>
                                {this.state.orderNum.map((num) => {
                                    return (
                                        <option value={JSON.stringify(num.id)}>Order Number: {JSON.stringify(num.id)}</option>
                                    );
                                })}
                            </select>
                            <button onclick={this.addToCart()}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderHeader;