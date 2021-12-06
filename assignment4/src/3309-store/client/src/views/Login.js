import React from "react";
import axios from "utils/axios";


//login component
class Login extends React.Component {

  state = {
    failedLogin: false
  };
  //login click event
  handleLogin = (event) => {
    //prevent default action
    event.preventDefault();

    //get form data from input fields
    let username = event.target[0].value;
    let password = event.target[1].value

    
    //login logic (verify with server)

    axios.get(`http://localhost:3001/verifylogin?username=${username}&password=${password}`).then((res) => {
      if (res.data) {
        localStorage.setItem("username", username);
        localStorage.setItem("userID", res.data.id);
        /*
        loginInfo.username = username;
        loginInfo.id = res.data.id;*/
        this.props.history.push('/');
      } else {
        this.setState ({
          failedLogin: true
        });
      }
    });
  }

  render() {
    return (
      <div className="login-container">
        <form className="box login-window" onSubmit={this.handleLogin}>
          <h4 className="title is-4">Login.</h4>
          {
          this.state.failedLogin? <h3 style={{ color: 'red' }}>Incorrect username or password</h3> : ""
          }
          {/* Username input field */}
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input type="text" className="input" placeholder="Username" name="username"/>
            </div>
          </div>
          {/* Password input field */}
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input type="password" className="input" placeholder="Password" name="password"/>
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
