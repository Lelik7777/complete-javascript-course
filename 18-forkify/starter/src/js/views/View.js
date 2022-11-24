import icons from 'url:../../img/icons.svg';
//здесь мы создали класс и его же экспортировали,поскольку его инстансы нам не нужны, а нужен именно класс,поскольку от него мы будем наслеовать другие классы
export default class View {
    _data;
    _parentEl;
    _error;
    _message;
//этот метод как бы универсальный - он может вставлять разметку в ДОМ, а также может возвращать строку с HTML
    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        //этот if используется для отрисовки результов и закладок
        if (!render) return markup;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    //похож на render, но только осуществляет отрисовку только того,что изменилось
    update(data) {
        this._data = data;
        //this._generateMarkup() return string with HTML
        //получаю витуальный DOM,который содержит все элементы,но при этом есть лишь в памяти
        const newDOM = document.createRange().createContextualFragment(this._generateMarkup());

        //я вытащил все элементы из newDOM
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const currElements = Array.from(this._parentEl.querySelectorAll('*'));

        //сравниваю элементы со страницы с элементами вируального DOM на наличие отличий
        newElements.forEach((newEl, i) => {
            const currEl = currElements[i];

            //updates changed Text in elements
            //trim() используем,чтобы удалить пустые сроки
            //firstChild in element - это текст,который содержится в элементе
            if (!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                currEl.textContent = newEl.textContent;
            }
            //Updates changed Attributes
            if (!newEl.isEqualNode(currEl)) {
                Array.from(newEl.attributes).forEach(attr => currEl.setAttribute(attr.name, attr.value));
            }
        })
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