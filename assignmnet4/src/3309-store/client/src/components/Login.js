import React from "react";

//login component
class Login extends React.Component {
  render() {
    return (
      <div className="login-container">
        <form className="box login-window">
          <h4 className="title is-4">Please Login First.</h4>
          {/* Username input field */}
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input type="text" className="input" placeholder="Username" />
            </div>
          </div>
          {/* Password input field */}
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input type="password" className="input" placeholder="Password" />
            </div>
          </div>
          {/* Submit Button */}
          <div className="control">
            <button className="button is-primary is-fullwidth">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
