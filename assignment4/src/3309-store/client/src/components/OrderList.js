import React from "react";
import OrderItem from "components/OrderItem";
import axios from "utils/axios";

class OrderList extends React.Component {

    state = {
        products: []
    };

    //fetch data from server
    componentDidMount() {
        if (localStorage.getItem("username")) {
            axios.get(`http://localhost:3001/orderItems?userID=${localStorage.getItem("userID")}`).then((res) => {
                this.setState({
                    products: res.data
                });
            });

        }
    }

    render() {

        return (
            <div className="products-container">
                <div className="columns is-multiline is-desktop">
                    {this.state.products.map((product) => {
                        return (
                            // each column is 3 slots, thus 4 products per line
                            <div className="column is-3" key={product.id}>
                                <OrderItem product={product} />
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }

}

export default OrderList;