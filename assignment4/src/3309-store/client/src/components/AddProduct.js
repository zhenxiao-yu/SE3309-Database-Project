import React from "react";
import axios from "utils/axios";

class AddProduct extends React.Component {
  //form state
  state = {
    id: "",
    prodName: "",
    sellerID: "",
    subtitle: "",
    image: "",
    descr: "",
    price: "",
    stock: "",
    prodStatus: "Normal",
    viewCount: "0",
    category: "Category",
  };

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
    // get product info from add new product form
    const product = { ...this.state };
    //send product information to server
    axios.post("http://localhost:3001/newproduct", product).then((res) => {
      //close editor window + pass props to product list
      this.props.close(res.data);
      //console.log(res.data);
      window.location.reload();
      alert("New Product Added");
    });
  };

  render() {
    return (
      <div className="child-popup">
        <p className="title has-text-centered is-4">Add A New Product</p>
        <form onSubmit={this.submit}>
          {/* product id */}
          <div className="field">
            <label className="label has-text-left">Product ID</label>
            <div className="control">
              <input
                type="number"
                className="input"
                name="id"
                value={this.state.id}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* seller id */}
          <div className="field">
            <label className="label has-text-left">Seller ID</label>
            <div className="control">
              <input
                type="number"
                className="input"
                name="sellerID"
                value={this.state.sellerID}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* product name */}
          <div className="field">
            <label className="label has-text-left">Product Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="prodName"
                value={this.state.prodName}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* product stock */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Stock</label>
              <input
                type="number"
                className="input"
                name="stock"
                value={this.state.stock}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* product price */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Price</label>
              <input
                type="number"
                className="input"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* product category */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Category</label>
              <input
                type="text"
                className="input"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* product view count */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">View Count</label>
              <input
                type="number"
                className="input"
                name="viewCount"
                value={this.state.viewCount}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* product image */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Image URL</label>
              <textarea
                className="textarea"
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* product subtitle */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Subtitle</label>
              <input
                type="text"
                className="input"
                name="subtitle"
                value={this.state.subtitle}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* product description */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Description</label>
              <textarea
                className="textarea"
                name="descr"
                value={this.state.descr}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* product status */}
          <div className="field">
            <div className="control">
              <label className="label has-text-left">Status</label>
              <div className="select is-fullwidth">
                <select
                  name="prodStatus"
                  value={this.state.prodStatus}
                  onChange={this.handleChange}
                >
                  <option>Normal</option>
                  <option>On Sale</option>
                  <option>Out Of Stock</option>
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

export default AddProduct;
