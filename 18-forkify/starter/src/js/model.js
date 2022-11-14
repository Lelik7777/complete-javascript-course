import {API_URL} from "./config";
import {getJSON} from "./helper";

export const state = {
    recipe: {}
}
export const loadRecipe = async (id) => {
    try {
       const data= await getJSON(`${API_URL}/${id}`);
        let {recipe} = data.data;
//устанавливаем данные в state
        state.recipe = {
            cooking_time: recipe.cooking_time,
            id: recipe.id,
            image_url: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            source_url: recipe.source_url,
            title: recipe.title,
        }
    } catch (e) {
       // console.log(e)
        //перебрасываю ошибку дальше для обработки в controller
        throw e;
    }
}