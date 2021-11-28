import React from "react";
import '../css/store.scss';
//login component
class Login extends React.Component {
  render() {
    return (
      <form className="login-container">
        {/* Username input field */}
        <div>
          <label>Username</label>
          <div>
            <input type="text" placeholder="Username" />
          </div>
        </div>
        {/* Password input field */}
        <div>
          <label>Password</label>
          <div>
            <input type="text" placeholder="Password" />
          </div>
        </div>
        {/* Submit Button */}
        <div>
          <button>Submit</button>
        </div>
      </form>
    );
  }
}

export default Login;
