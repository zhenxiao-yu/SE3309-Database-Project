import React from "react";

class AddProduct extends React.Component {
  render() {
    return (
      <div className="child-popup">
        <p className="title has-text-centered is-4">Add A New Product</p>
        <br />
        <div className="control">
            <input type="text" className="input" />
        </div>
        <br />
        {/* cancel button */}
        <div
          className="button"
          onClick={() => {
            this.props.hidePopup('AddProduct Data');
          }}
        >
          Cancel
        </div>
      </div>
    );
  }
}

export default AddProduct;
