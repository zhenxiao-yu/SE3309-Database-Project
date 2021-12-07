import React from "react";
import axios from "utils/axios";
//orderHeader class
class OrderHeader extends React.Component {
    //sets the states for some header information
    constructor(props) {
        super(props);
        this.state = {
            orderNum: [],
            selectValue: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    //fetch data from server
    componentDidMount() {
        if (localStorage.getItem("username")) {
            axios.get(`http://localhost:3001/orderInfo?userID=${localStorage.getItem("userID")}`).then((res) => {
                this.setState({
                    orderNum: res.data
                });
            });
        }
    }

    //changes state when selected drop down item changes
    handleChange = (event) => {
        this.setState({ selectValue: event.target.value });
    };

    //function that adds items to cart
    addToCart = () => {
        //
        axios.get(`http://localhost:3001/addOrderCart?userID=${localStorage.getItem("userID")}&orderNum=${this.state.selectValue}`)
            .then((res) => {
                alert(res.data);
            });

    };

    render() {
        return (
            <div>
                <div className="order-banner">
                {/* title */}
                    <div className="order-num">Product Order History</div>
                    <div className="reorder">
                        <div>
                            <select onChange={this.handleChange}>
                            {/* loads dropdown menu items */}
                                {this.state.orderNum.map((num) => {
                                    return (
                                        <option value={JSON.stringify(num.id)}>Order Number: {JSON.stringify(num.id)}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <button onClick={this.addToCart.bind(this)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderHeader;