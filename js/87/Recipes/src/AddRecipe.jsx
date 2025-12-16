import React from "react";
import HomeButton from "./components/HomeButton";

function AddRecipe(props) {
  const [recipeinfo, setRecipeinfo] = React.useState({
    name: "",
    picture: "",
    ingredients: [],
    directions: [],
  });

  const changeHandler = (e) => {
    setRecipeinfo({
      ...recipeinfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (recipe) => {
    recipe.preventDefault();
    console.log("submitted", recipeinfo);
    props.addRecipes(recipeinfo);
    alert("Recipe added!");
    setRecipeinfo({ name: "", picture: "", ingredients: [], directions: [] });
  };

  return (
    <>
      <div>AddRecipe</div>
      <HomeButton setPage={props.setPage} />

      <form onSubmit={submitHandler}>
        <div>
          Name:
          <input
            type="text"
            name="name"
            value={recipeinfo.name}
            onChange={changeHandler}
          />
        </div>
        <div>
          Add a picture url:
          <input
            type="text"
            name="picture"
            value={recipeinfo.picture}
            onChange={changeHandler}
          />
        </div>
        <div>
          ingredients:
          <input
            type="text"
            name="ingredients"
            value={recipeinfo.ingredients}
            onChange={changeHandler}
          />
        </div>
        <div>
          Directions:
          <input
            type="text"
            name="directions"
            value={recipeinfo.directions}
            onChange={changeHandler}
          />
        </div>
        <button type="submit">Add recipe</button>
      </form>
    </>
  );
}

export default AddRecipe;
