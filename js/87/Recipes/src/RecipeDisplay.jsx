import React, { Component } from "react";

import Recipe from "./components/Recipe";
import NoRecipe from "./components/NoRecipe";
import RecipeList from "./components/RecipeList";
import HomeButton from "./components/HomeButton";

export default class RecipeDisplay extends Component {
  state = {
    //recipes: [],
    selectedRecipe: 1
  };

  constructor() {
    super();

    this.selectRecipe = this.selectRecipe.bind(this);
  }

  async componentDidMount() {
    if (!this.state.fetchedRecipes) {
      try {
        const response = await fetch("recipes.json");
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const recipes = await response.json();
        console.log(recipes);
        //   from when recipes were kept in this component
        //
        //   this.setState({
        //     recipes,
        //   });

        this.props.addRecipes(recipes);

        console.log("in component did mount", this.props.recipes);
      } catch (e) {
        console.error(e);
      }
    }
  }

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.recipes !== this.props.recipes) {
  //       console.log("updated recipes", this.props.recipes);
  //     }
  //   }
  //   from when recipes were kept in this component
  //
  //   addRecipeHandler = (r) => {
  //     this.setState({
  //       recipes: [...this.state.recipes, r],
  //     });
  //   };

  selectRecipe = (e) => {
    this.setState({
      selectedRecipe: e.target.value,
    });
  };

  render() {
    const { selectedRecipe } = this.state;
    const { recipes } = this.props;

    const recipe = !recipes.length ? (
      <NoRecipe />
    ) : (
      <Recipe recipe={recipes[selectedRecipe]} />
    );

    return (
      <>
        <HomeButton setPage={this.props.setPage} />
        <RecipeList
          recipes={recipes}
          selectedRecipe={selectedRecipe}
          selectRecipe={this.selectRecipe}
        />

        {recipe}
      </>
    );
  }
}
