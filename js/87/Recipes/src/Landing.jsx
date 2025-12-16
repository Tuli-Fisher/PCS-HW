import React from "react";
import RecipeDisplay from "./RecipeDisplay";
import './Landing.css'

function Landing(props) {

  return (
    < div className='landing-container'>
      <button onClick={() => props.setPage('RecipeDisplay')}>Click here for some amazing recipes!</button>
      <div></div>
      <button onClick={() => props.setPage('AddRecipe')}>Click here to add a recipe</button>
    </div >
  );
}

export default Landing;
