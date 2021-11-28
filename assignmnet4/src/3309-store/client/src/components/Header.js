import React from "react";

// Header component
class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <div className="navigation">
          {/* links at right side of the header */}
          <div className="nav-left">
            <a href="/">Home</a>
            <a href="/">Wishlist</a>
          </div>
          {/* links at left side of the header */}
          <div className="nav-right">
            <a href="/">Login</a> 
            <a href="/">Register</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
