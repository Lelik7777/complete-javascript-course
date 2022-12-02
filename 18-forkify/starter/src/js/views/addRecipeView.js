import View from "./View";
import {CLICK, HIDDEN} from "../config";
import {toggle} from "../helper";


class AddRecipeView extends View {
    _parentEl = document.querySelector('.upload');

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();

    }

    _toggleWindow() {
        toggle(this._overlay, HIDDEN);
        toggle(this._window, HIDDEN);
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener(CLICK, this._toggleWindow.bind(this));
    }

    _addHandlerCloseWindow() {
        this._btnClose.addEventListener(CLICK, this._toggleWindow.bind(this));
        this._overlay.addEventListener(CLICK, this._toggleWindow.bind(this));
    }

    addHandlerAddRecipe(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            //этот конструктор принимает элемент форма и возвращает объект с entries,поэтому его деструктурируем
            const arrData = [...new FormData(this)];
            //transform array to object
            const data = Object.fromEntries(arrData);
            handler(data);
        })
    }

    _generateMarkup() {

    }


}

export default new AddRecipeView();