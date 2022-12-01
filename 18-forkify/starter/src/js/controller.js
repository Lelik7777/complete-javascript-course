import * as model from './model';
import recipeView from "./views/recipeView";
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";
//я могу просто импортировать все из любого js файла и все вызовы ф-ций и все консоли  отработают
import * as some from './some.js';

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
        //0)update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());
        //00) update bookmarks
        bookmarksView.update(model.state.bookmarks);
        //1)load recipe
        //async request for recipe
        await model.loadRecipe(id);
        const {recipe} = model.state;
        //console.log(recipe)
        //2)render data
        recipeView.render(recipe);


    } catch (err) {
        recipeView.renderError();
        console.log(err);
    }

};
const controlResearchResults = async () => {
    try {
        //1 get search query
        const query = searchView.getQuery();
        if (!query) return;
        resultsView.renderSpinner();
        //2 load query and get results
        await model.loadSearchResults(query);
        //3 render results
        const resPerPage = model.getSearchResultsPage();
        console.log(resPerPage)
        resultsView.render(resPerPage);
        //4 render buttons for pagination
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
}
const controlPagination = (goToPage) => {
    //1 render new results
    const resPerPage = model.getSearchResultsPage(goToPage);
    resultsView.render(resPerPage);
    //2 render new pagination buttons
    paginationView.render(model.state.search);
}

function controlServings(newServings) {
    //update state
    model.updateServings(newServings);
    //rerender recipe view

    const {recipe} = model.state;
    //реализую паттерн частичной перерисовки только измененных элементов на страницы,поэтому вместо метода .render использую .update
    //recipeView.render(recipe)
    recipeView.update(recipe);
}

function controlAddBookmark() {
    //add/remove bookmark
    const {recipe, bookmarks} = model.state;
    if (recipe.bookmarked) model.removeBookmark(recipe.id)
    else model.addBookmark(recipe);
    //update recipe view
    recipeView.update(recipe);
    //
    bookmarksView.render(bookmarks);
}

function controlBookmarks() {
    bookmarksView.render(model.state.bookmarks);
}

//
function init() {
    bookmarksView.addHandlerRenderBookmarks(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlResearchResults);
    paginationView.addHandlerPagination(controlPagination);

}

init();

