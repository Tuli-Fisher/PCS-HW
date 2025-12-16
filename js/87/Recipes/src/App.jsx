import { Component } from "react";
import "./App.css";
import RecipeDisplay from "./RecipeDisplay";
import Header from "./components/Header";
import Landing from "./landing";
import AddRecipe from "./AddRecipe";

export default class App extends Component {
  state = {
    page: "Landing",
    recipes: [],
  };

  changePage = (pageName) => {
    console.log(pageName);
    this.setState({
      page: pageName,
    });
  };

  addRecipes = (recipes) => {
    const recipeArray = Array.isArray(recipes) ? recipes : [recipes];

    console.log("these recipes are being added", recipeArray);
    this.setState({
      recipes: [...this.state.recipes, ...recipeArray],
    });
  };

  render() {
    return (
      <>
        <Header />
        {this.state.page === "Landing" && <Landing setPage={this.changePage} />}
        {this.state.page === "AddRecipe" && (
          <AddRecipe setPage={this.changePage} addRecipes={this.addRecipes} />
        )}
        {this.state.page === "RecipeDisplay" && (
          <RecipeDisplay
            recipes={this.state.recipes}
            setPage={this.changePage}
            addRecipes={this.addRecipes}
          />
        )}
      </>
    );
  }
}
