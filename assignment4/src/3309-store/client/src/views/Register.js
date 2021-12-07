import React from "react";
import axios from "utils/axios";

//register component
class Register extends React.Component {

    state = {
        id: "",
        username: "",
        pass: "",
        email: "",
        phoneNum: "",
        secureQ: "",
        secureA: "",
        storeName: "",
        sellerFlag: "0",
        userFlag: "1",
        failedRegistser: false
    };

    //Register click event
    handleRegister = (event) => {
        //prevent default action
        event.preventDefault();
  
        //get form data from input fields
        let username = event.target[0].value;

        const user = { ...this.state };
  
        axios.post(`http://localhost:3001/newUser`, user).then((res) => {
         if (res.data) {
          localStorage.setItem("username", username);
          localStorage.setItem("userID", res.data.id);
          /*
          loginInfo.username = username;
          loginInfo.id = res.data.id;*/
          this.props.history.push('/');
        } else {
          this.setState ({
            failedRegistser: true
          });
        }
      });
    }
  
    render() {
      return (
        <div className="register-container">
          <form className="box register-window" onSubmit={this.handleRegister}>
            <h4 className="title is-4">Register.</h4>
            {
            this.state.failedRegistser? <h3 style={{ color: 'red' }}>Choose another username/Fill required fields</h3> : ""
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
                <input type="password" className="input" placeholder="Password" name="pass"/>
              </div>
            </div>
            {/* Email input field */}
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input type="email" className="input" placeholder="Email" name="email"/>
              </div>
            </div>
            {/* Phone number input field */}
            <div className="field">
              <label className="label">Phone number</label>
              <div className="control">
                <input type="phoneNum" className="input" placeholder="Phone number" name="phoneNum"/>
              </div>
            </div>
            {/* Secure question input field */}
            <div className="field">
              <label className="label">Secure Question</label>
              <div className="control">
                <input type="secureQ" className="input" placeholder="Secure Question" name="secureQ"/>
              </div>
            </div>
            {/* Secure answer input field */}
            <div className="field">
              <label className="label">Secure Answer</label>
              <div className="control">
                <input type="secureA" className="input" placeholder="Secure Answer" name="secureA"/>
              </div>
            </div>
            {/* Store name input field */}
            <div className="field">
              <label className="label">Store Name</label>
              <div className="control">
                <input type="storeName" className="input" placeholder="Store Name" name="storeName"/>
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
  
  export default Register;