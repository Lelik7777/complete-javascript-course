import {API_URL} from "./config";
import {getJSON} from "./helper";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    }
}
export const loadRecipe = async (id) => {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        let {recipe} = data.data;
//устанавливаем данные в state
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image_url: recipe.image_url,
            ingredients: recipe.ingredients,
            servings: recipe.servings,
            source_url: recipe.source_url,
            cooking_time: recipe.cooking_time,
        }
    } catch (err) {
        // console.log(err);
        //перебрасываю ошибку дальше для обработки в controller
        throw err;
    }
}
export const loadSearchResults = async (query) => {
    try {
        const data = await getJSON(`${API_URL}?search=${query}`);
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
