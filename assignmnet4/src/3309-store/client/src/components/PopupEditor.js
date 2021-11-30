import React from "react";
import { render } from "react-dom";

//popup editor for editing product details
class PopupEditor extends React.Component {
  state = {
    //deactivated by default
    on: false,
  };

  //hidePopup method
  hidePopup = () => {
    this.setState({
      on: false,
    });
  };

  //showPopup method
  showPopup = () => {
    this.setState({
      on: true,
    });
  };

  render() {
    //change css class based on state of the component
    const popup_class = {
      true: "popup-container on",
      false: "popup-container",
    };

    return (
      <div className={popup_class[this.state.on]}>
        {/* hide popup when overlay is clicked */}
        <div className="overlay" onClick={this.hidePopup}></div>
        <div className="window">
          <div className="window-header">
            {/* hide popup when x is clicked */}
            <span className="close-btn" onClick={this.hidePopup}>
              x
            </span>
            <p className="has-text-centered">Children component</p>
          </div>
        </div>
      </div>
    );
  }
}

//create container
const editorDiv = document.createElement("div");
document.body.appendChild(editorDiv); //add to body

//render component
const _editorDiv = render(<PopupEditor />, editorDiv);
export default _editorDiv;
