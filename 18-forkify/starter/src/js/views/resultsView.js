import View from "./View";

class ResultsView extends View {
    _parentEl = document.querySelector('.results');
    _error = 'No recipes  found for your query. Please try again!';
    _message = '';

    _generateMarkup() {
        return this._data.map(res => this._generateMarkupPreview(res)).join('');
    }

    _generateMarkupPreview(res) {
        const id = window.location.hash.slice(1);
        const linkAct = 'preview__link--active';
        return `
             <li class="preview">
            <a class="preview__link ${id === res.id ? linkAct : ''} " href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.image_url}" alt="${res.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
<!--                <div class="preview__user-generated">-->
<!--                  <svg>-->
<!--                    <use href="src/img/i#icon-user"></use>-->
<!--                  </svg>-->
<!--                </div>-->
              </div>
            </a>
          </li>
        `;
    }
}

export default new ResultsView();