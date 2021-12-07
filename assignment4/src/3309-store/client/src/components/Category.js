import {React} from "react";

// Category buttons in the header 
function Category(props, {callback}){
  // Sends GET request onClick
  function onClick(){
    props.callback(props.categoryName);
  }

  return(
    <div onClick={onClick} className="category-container">
        <p>{props.categoryName}</p>
    </div>
  )
}

export default Category;
