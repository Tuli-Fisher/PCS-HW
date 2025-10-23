/* global $ */
(async function(){
    'use strict';

    const recipeList = $('#recipeslist');
    const recipeNameElem = $('#recipeName');
    const recipePictureElem = $('#pic');
    const recipeIngredientsElem = $('#ingredients');
    const showRecipe = $('.showRecipe');

    try {

        const result = await fetch('recipes.json');
        if(!result.ok){
            throw new Error(`${result.status} - ${result.statusText}`);
        }
        const recipes = await result.json();
        

        recipes.forEach(r => {
            recipeList.append(`<option value="${r.id}">${r.name}</option>`);
        });

        recipeList.change(async function(){
            try{
                const r = await fetch(this.value + '.json');
                if(!r.ok){
                    throw new Error(`${r.status} - ${r.statusText}`);
                }
                const recipe = await r.json();
                recipeNameElem.text(recipe.name);
                recipePictureElem.attr('src', recipe.picture);
                recipeIngredientsElem.text(recipe.ingredients);
                showRecipe.show();
            }catch(e){
                console.error(e.message);
            }
        });

    }catch(e){
        console.error(e.message);
    }

}());