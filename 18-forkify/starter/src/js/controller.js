import * as model from './model';
import recipeView from "./views/recipeView";
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
    try {
        //get id without # from  url bar
        const id = window.location.hash.slice(1);
//guard clause if id doesn`t exist
        if (!id) return;
        recipeView.renderSpinner();
        //load recipe
        //async request for recipe
        await model.loadRecipe(id);
        const {recipe} = model.state;
        console.log(recipe);
        //render data
        recipeView.render(recipe)

    } catch (e) {
        recipeView.renderError();
        console.log(e);
    }

}
//showRecipe();
//
(function init() {
    recipeView.addHandlerRender(controlRecipes);
})();
//init();

