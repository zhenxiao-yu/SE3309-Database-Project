import React from "react";


export default function UserProfile(props) {
  // logout method
  const logout = () => {
    //global.auth.logout();
    props.close("logout");
  };

  return (
    <div className="user-profile">
      <p className="title has-text-centered">Profile</p>
      <fieldset disabled>
        {/* User name */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Username</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.username}
            />
          </div>
        </div>
        {/* user email */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Email</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.email}
            />
          </div>
        </div>
        {/* user type */}
        <div className="field">
          <div className="control">
            <label className="label has-text-left">Account Type</label>
            <input
              className="input"
              type="text"
              //change user type status
              defaultValue={
                props.user.type === 1 ? "Seller" : "Buyer"
              }
            />
          </div>
        </div>
      </fieldset>

      <br />
      <br />
      <div className="field is-grouped is-grouped-centered">
        {/* logout button */}
        <div className="control">
          <button className="button is-danger" type="button" onClick={logout}>
            Logout
          </button>
        </div>
        {/* close button */}
        <div className="control">
          <button
            className="button"
            type="button"
            onClick={() => {
              props.close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
