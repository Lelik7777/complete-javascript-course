import * as model from './model';
import recipeView from "./views/recipeView";
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
    //get data from API
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
        alert(e);
    }

}
//showRecipe();
//
//window.addEventListener('hashchange',showRecipe);
//when page loaded
//window.addEventListener('load',showRecipe);
//there is duplicate code that why we use array of events
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));