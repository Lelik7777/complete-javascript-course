import {API_URL, START_PAGE_SEARCH_RES, RES_PER_PAGE, KEY} from "./config";
import {AJAX} from "./helper";


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: START_PAGE_SEARCH_RES,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) ?? [],
}
const createRecipeObject = (data) => {
    let {recipe} = data.data;
    console.log(recipe)
    return {
        ...(recipe.key && {key: recipe.key}),
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image_url: recipe.image_url,
        ingredients: recipe.ingredients,
        servings: recipe.servings,
        source_url: recipe.source_url,
        cooking_time: recipe.cooking_time,

    }
}
export const loadRecipe = async (id) => {
    try {
        const data = await AJAX(`${API_URL}${id}`);
        state.recipe = createRecipeObject(data);
        console.log(state.recipe);
        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    } catch (err) {
        console.log(err);
        //перебрасываю ошибку дальше для обработки в controller
        throw err;
    }
}
export const loadSearchResults = async (query) => {
    try {
        const data = await AJAX(`${API_URL}?search=${query}`);
        state.search.results = data.data.recipes.map(rec => ({
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            image_url: rec.image_url,
        }));
    } catch (err) {
        throw err;
    }

}
//create function for dividing search results for portions by 10 elements
export const getSearchResultsPage = (page = START_PAGE_SEARCH_RES) => {
    state.search.page = page;
    const numPages = state.search.resultsPerPage;
    const start = (page - 1) * numPages;
    const end = page * numPages;
    return state.search.results.slice(start, end);
}

export const updateServings = (newServings) => {
    //formula for update servings: newQuantity=oldQuantity*newServings/oldServings
    //мутируем state,производя переназначение количества всех ингридиентов
    state.recipe.ingredients.forEach(ing => ing.quantity = ing.quantity * newServings / state.recipe.servings);
    //переопределяем количество порций
    state.recipe.servings = newServings;
}
const addBookmarksToLocalStorage = () => {
    const bookmarks = JSON.stringify(state.bookmarks);
    localStorage.setItem('bookmarks', bookmarks);
}
export const addBookmark = (recipe) => {
    //add recipe in bookmarks array
    state.bookmarks.push(recipe);
    //mark selected recipe
    //create new property bookmarked and put value
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    addBookmarksToLocalStorage();
}
export const removeBookmark = (id) => {
    const index = state.bookmarks.findIndex(bm => bm.id === id);
    state.bookmarks.splice(index, 1);
    state.recipe.bookmarked = false;
    addBookmarksToLocalStorage();
}

//{quantity: 1, unit: '', description: 'medium head cauliflower cut into florets'}
export const uploadRecipe = async (newRecipe) => {
    try {
        console.log(newRecipe)
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                const arrIng = ing[1].replace(' ', '').split(',');
                if (arrIng.length !== 3) throw new Error('wrong recipe format');
                const [quantity, unit, description] = arrIng;
                return {quantity: quantity ? +quantity : null, unit, description}
            })
        const recipeNew = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            image_url: newRecipe.image,
            ingredients,
            servings: +newRecipe.servings,
            source_url: newRecipe.sourceUrl,
            cooking_time: +newRecipe.cookingTime
        }
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipeNew);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
        console.log(state.recipe)
    } catch (e) {
        throw e;
    }

}
