import React from "react";

// Header component
const Header = (props) => {
  return (
    <div className="header-container">
      <div className="navigation">
        {/* links at right side of the header */}
        <div className="nav-left">
          {/* redirect to home page */}
          <a href="/">Home</a>
          {/* redirect to user's Wishlist */}
          <a href="/">Wishlist</a>
          {/* redirect to user's Order*/}
          <a href="/">Orders</a>
          {/* redirect to user's Payment info */}
          <a href="/">Payment</a>
        </div>
        {/* links at left side of the header */}
        <div className="nav-right">
          {/* render username when logged in */}
          {/* render register/login button when logged out */}
          {localStorage.getItem("username") ? (
            <span className="username">
              <i className="fa fa-user"></i>
              {localStorage.getItem("username")}
            </span>
          ) : (
            <React.Fragment>
              {/* redirect to login page */}
              <a href="/login">Login</a>
              {/* redirect to Register page */}
              <a href="/">Register</a>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
