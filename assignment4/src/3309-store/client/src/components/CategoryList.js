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
              <Category callback={this.method} categoryName="Computer Mice" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Computers" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Furniture" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Game Consoles" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Monitors" />
            </div>
            <div className="column is-2">
              <Category callback={this.method} categoryName="Phones" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryList;
