import icons from 'url:../../img/icons.svg';
//здесь мы создали класс и его же экспортировали,поскольку его инстансы нам не нужны, а нужен именно класс,поскольку от него мы будем наслеовать другие классы
export default class View {
    _data;
    _parentEl;
    _error;
    _message;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', this._generateMarkup());
    }

    _clear() {
        this._parentEl.innerHTML = '';
    }


    renderSpinner() {
        this._clear();
        const markup =
            `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        this._clear();
        const markup = `
            <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `
    }

    renderError(message = this._error) {
        this._clear();
        const markup = `
            <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    _generateMarkup() {
    }
}