export const state = {
    recipe: {}
}
export const loadRecipe = async (id) => {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message}(Status:${res.status})`);
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
        alert(e);
    }
}