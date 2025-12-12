import React, { Component } from 'react'
import Header from './components/Header';
import Recipe from './components/Recipe';
import NoRecipe from './components/NoRecipe';
import RecipeList from './components/RecipeList';


export default class RecipeDisplay extends Component {
  state = {
    recipes: [],
    selectedRecipe: 1,
    screen: 'landing' 
  }

  constructor() {
    super();

    this.selectRecipe = this.selectRecipe.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch('recipes.json');
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const recipes = await response.json();
      console.log(recipes);

      this.setState({
        recipes
      });

    } catch (e) {
      console.error(e);
    }
  }

  selectRecipe = e => {
    this.setState({
      selectedRecipe: e.target.value
    });
  }

  render() {
    const { recipes, selectedRecipe } = this.state;

    const recipe = !recipes.length
      ? <NoRecipe />
      : <Recipe recipe={recipes[selectedRecipe]} />

    return (
      <>
        <Header />
      
        <RecipeList recipes={recipes} selectedRecipe={selectedRecipe} selectRecipe={this.selectRecipe} />

        {recipe}
      </>
    );
  }
}
