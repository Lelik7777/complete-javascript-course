import icons from 'url:../../img/icons.svg';
import {Fraction} from "fractional";
import View from "./View";

class RecipeView extends View {
    //поскольку происходит наследование классов,то не могу использовать значок приватности #,поскольку он не поддерживается parcel and babel на данный момент,поэтому все приватные поля и методы выделяем через _
    _parentEl = document.querySelector('.recipe');
    _error = 'We could not find this recipe. Try please another one !';
    _message = '';


//window.addEventListener('hashchange',showRecipe);
//when page loaded
//window.addEventListener('load',showRecipe);
//there is duplicate code that why we use array of events
//there is using published-subscriber pattern
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }

    addHandlerUpdateServings(handler) {
        this._parentEl.addEventListener('click', function (e) {
            //поскольку кнопка имеет вложенную картинку,то используем метод closest,чтобы поймать всплытие события именно на кнопке с классом .btn--tiny
            const btn = e.target.closest('.btn--tiny');
            //если нажатие не на кнопке,то сразу же выйти из ф-ции
            if (!btn) return;
            const {updateServings} = btn.dataset;
            //поскольку из btn.dataset приходит строка, то нам ее нужно конвертировать в число
            handler(+updateServings);
        })

    }

    _generateMarkup() {
        return (`
         <figure class="recipe__fig">
          <img src="${this._data.image_url}" alt="${this._data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cooking_time}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
             <!--используем data ,чтобы из нее достать число,результат выражения при нажатии на кнопку-->
              <button class="btn--tiny btn--increase-servings" data-update-servings="${this._data.servings - 1}">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-servings="${this._data.servings + 1}">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
           
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(ing => this._markupIngredient(ing)).join('')}
   
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `);
    }

    _markupIngredient(ing) {
        return `
                <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li> 
              `
    }
};
export default new RecipeView();