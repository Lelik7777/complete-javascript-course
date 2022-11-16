import * as model from './model';
import recipeView from "./views/recipeView";
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";

//https://forkify-api.herokuapp.com/v2 - documentation by forkify


///////////////////////////////////////
// if(module.hot){
//     module.hot.accept();
// }

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
        const query = searchView.getQuery();
        if (!query) return;
        resultsView.renderSpinner();
        //load query and get results
        await model.loadSearchResults(query);
        //render results
        const resPerPage = model.getSearchResultsPage(2);
        resultsView.render(resPerPage);
        //render buttons for pagination
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
}

//
function init() {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlResearchResults);
}

init();

