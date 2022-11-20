import icons from 'url:../../img/icons.svg';
import View from "./View";

class PaginationView extends View {
    _parentEl = document.querySelector('.pagination');

    addHandlerPagination(handler) {
        this._parentEl.addEventListener('click', function (e) {

            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const {page:goToPage} = btn.dataset;
            //поскольку из кнопки получаем строку goToPage
            handler(Number(goToPage));
        })
    }

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const currPage = this._data.page;
        //console.log('number of pages', numPages)
        // show only right button
        if (currPage === 1 && numPages > 1) {
            return this._markupRightBut(currPage + 1);
        }
        //show only left button
        if (currPage === numPages && numPages > 1) {
            return this._markupLeftBut(currPage - 1);
        }

        // show left and right buttons
        if (currPage < numPages) {
            return this._markupLeftBut(currPage - 1) + this._markupRightBut(currPage + 1);
        }


        //don`t show buttons
        return ''
    }

    _markupLeftBut(value) {
        return `
           <button data-page="${value}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${value}</span>
          </button>
        `
    }

    _markupRightBut(value) {
        return `
            <button data-page="${value}" class="btn--inline pagination__btn--next">
            <span>${value}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>  
        `
    }


}

export default new

PaginationView();