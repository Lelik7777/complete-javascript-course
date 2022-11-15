import * as model from './model';
import recipeView from "./views/recipeView";
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import resultsView from "./views/resultsView";

//https://forkify-api.herokuapp.com/v2 - documentation by forkify


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

    } catch (err) {
        recipeView.renderError();
        console.log(err);
    }

};
const controlResearchResults = async () => {
    try {
        //get search query
        const query = resultsView.getQuery();
        if (!query) return;
        //load query and get results
        await model.loadSearchResults(query);
        //render rusults
        console.log(model.state.search.results);
    } catch (err) {
        console.log(err);
    }
}
//showRecipe();
//
function init() {
    recipeView.addHandlerRender(controlRecipes);
    resultsView.addHandlerSearch(controlResearchResults);
}

init();

