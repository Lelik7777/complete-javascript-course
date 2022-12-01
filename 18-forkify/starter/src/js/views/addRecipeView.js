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
    }

    _toggleWindow() {
        toggle(this._overlay, HIDDEN);
        toggle(this._window, HIDDEN);
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener(CLICK, this._toggleWindow.bind(this));
    }

    _generateMarkup() {

    }


}

export default new AddRecipeView();