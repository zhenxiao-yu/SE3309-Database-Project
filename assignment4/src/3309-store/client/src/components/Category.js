import {React} from "react";
import axios from "utils/axios";

function Category(props){
  // Sends GET request onClick
  function onClick(){
    // Use prop categoryName to send the current category name 
    axios.get(`http://localhost:3001/filter-products/?category=${props.categoryName}`).then((response)=>{
      // Returns JSON in web console
      console.log(response.data);
    });
  }

  return(
    <div onClick={onClick} className="category-container">
        <p>{props.categoryName}</p>
    </div>
  )
}

export default Category;
