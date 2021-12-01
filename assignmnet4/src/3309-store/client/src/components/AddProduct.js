import React from "react";

class AddProduct extends React.Component {
  render() {
    return (
      <div className="child-popup">
        <p className="title has-text-centered is-4">Add A New Product</p>
        {/* product name */}
        <div className="field">
          <label className="label has-text-left">Product Name</label>
          <div className="control">
            <input type="text" className="input" name="prodName" />
          </div>
        </div>

        {/* product stock */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Stock</label>
            <input type="number" className="input" name="stock" />
          </div>
        </div>

        {/* product price */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Price</label>
            <input type="number" className="input" name="price" />
          </div>
        </div>

        {/* product category */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Category</label>
            <input type="text" className="input" name="category" />
          </div>
        </div>

        {/* product image */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Image URL</label>
            <textarea className="textarea" name="image" />
          </div>
        </div>

        {/* product subtitle */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Subtitle</label>
            <input type="text" className="input" name="subtitle" />
          </div>
        </div>

        {/* product description */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Description</label>
            <textarea className="textarea" name="descr" />
          </div>
        </div>

        {/* product status */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Status</label>
            <div className="select is-fullwidth">
              <select name="prodStatus">
                <option>normal</option>
                <option>onsale</option>
                <option>unavailable</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <br />
        {/* buttons */}
        <div className="field is-grouped is-grouped-centered">
          {/* Sumbit Button */}
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          {/* Close Button */}
          <div className="control">
            <button className="button" type="button">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProduct;
