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
const showRecipe = async () => {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);

        if (!res.ok) throw new Error(`${res.url}(Status:${res.status})`);
        let {data: {recipe}} = await res.json();
        recipe = {
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
showRecipe();