import React from "react";
import { render } from "react-dom";

//popup editor for editing product details
class PopupEditor extends React.Component {
  state = {
    //deactivated by default
    on: false,
    //initial state doesn't carry child component
    component: null,
    callback: () => {},
  };

  open = (
    options = {
      props: {},
      component: null,
      callback: () => {}
    }
  ) => {
    const { props, component, callback } = options;
    //define key as current time, so that key changes every time popup opens
    const popupKey = new Date().getTime();
    // create child as react element and pass on parent hide method
    const newComponent = React.createElement(component, {
      ...props, //destructure
      close: this.close,
      key: popupKey,
    });
    this.setState({
      on: true,
      component: newComponent,
      callback: callback,
    });
  };

  //close method
  close = (data) => {
    this.setState({
      on: false,
    });
    // get data from child component and pass it on using callback
    this.state.callback(data);
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
        <div
          className="overlay"
          onClick={() => {
            this.close();
          }}
        ></div>
        <div className="window">
          <div className="window-header">
            {/* hide popup when x is clicked */}
            <span
              className="close-btn"
              onClick={() => {
                this.close();
              }}
            >
              x
            </span>
            {this.state.component}
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
