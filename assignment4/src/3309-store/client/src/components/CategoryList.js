import React from "react";
import Category from "components/Category";

class CategoryList extends React.Component {
  render() {
    return (
      <div>
        <div className="categories-container">
          {/* each line has 12 slots */}
          <div className="columns is-multiline is-desktop">
            {/* each column is 3 slots, thus 4 products per line */}
            <div className="column is-2">
              <Category />
            </div>
            <div className="column is-2">
              <Category />
            </div>
            <div className="column is-2">
              <Category />
            </div>
            <div className="column is-2">
              <Category />
            </div>
            <div className="column is-2">
              <Category />
            </div>
            <div className="column is-2">
              <Category />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryList;
