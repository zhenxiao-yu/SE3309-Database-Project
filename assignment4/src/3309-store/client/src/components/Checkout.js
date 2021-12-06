import React from "react";
import axios from "utils/axios";

class Checkout extends React.Component {
    //form state
    state = {
        paymentID: "",
        shippingID: "",

        paymentMethods: [],
        addresses: []
    };


    //fetch data from server
    componentDidMount() {
        axios.get(`http://localhost:3001/paymentInfo?userID=${localStorage.getItem("userID")}`).then((res) => {
            this.setState({
                paymentMethods: res.data
            });
        });

        axios.get(`http://localhost:3001/shippingInfo?userID=${localStorage.getItem("userID")}`).then((res) => {
            this.setState({
                addresses: res.data
            });
        });



    }

    handleChange = (event) => {
        //monitor form input
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        });
    };

    submit = (e) => {
        //stop default form behavior
        e.preventDefault();

        // get all the info and the user id to add
        const info = {
            paymentID: this.state.paymentID,
            shippingID: this.state.shippingID,
            userID: localStorage.getItem("userID")
        };

        if (info.paymentID !== "" && info.shippingID !== "") {
            //send product information to server
            axios.post("http://localhost:3001/addOrder", info).then((res) => {
                //close editor window + pass props to product list
                this.props.close(res.data);
                //console.log(res.data);
                alert(res.data);
                window.location.reload(false);

            });
        }
    };

    render() {
        return (
            <div className="child-popup">
                <p className="title has-text-centered is-4">Checkout</p>
                <form onSubmit={this.submit}>

                    {/* Payment info */}
                    <div className="field">
                        <div className="control">
                            <label className="label has-text-left">Payment Info</label>
                            <div className="select is-fullwidth">
                                <select
                                    name="paymentID"
                                    value={this.state.paymentID}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Choose Value</option>

                                    {this.state.paymentMethods.map((payment) => {
                                        return (
                                            <option value={payment.id}>{payment.paymentMethod}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Shipping info */}
                    <div className="field">
                        <div className="control">
                            <label className="label has-text-left">Payment Info</label>
                            <div className="select is-fullwidth">
                                <select
                                    name="shippingID"
                                    value={this.state.shippingID}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Choose Value</option>
                                    {this.state.addresses.map((address) => {
                                        return (
                                            <option value={address.id}>{address.recipientAddress}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <br />
                    {/* buttons */}
                    <div className="field is-grouped is-grouped-centered">
                        {/* Sumbit Button */}
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        {/* Close Button */}
                        <div className="control">
                            <button
                                className="button"
                                type="button"
                                onClick={() => {
                                    this.props.close();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Checkout;