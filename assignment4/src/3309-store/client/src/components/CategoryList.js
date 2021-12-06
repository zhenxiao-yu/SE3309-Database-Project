import React from "react";
import Category from "components/Category";

class CategoryList extends React.Component {
  
  method = (data) => {
    this.props.callback(data);
  };

  render() {
    return (
      <div>
        <div className="categories-container">
          {/* each line has 12 slots */}
          <div className="columns is-multiline is-desktop">
            {/* each column is 3 slots, thus 4 products per line */}
            <div className="column is-2">
              <Category callback={this.method} categoryName="Category 1" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Category 2" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Category 3" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Category 4" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Category 5" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Category 6" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryList;
