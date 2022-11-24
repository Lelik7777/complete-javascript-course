import View from "./View";
import previewView from "./previewView";

class BookmarksView extends View {
    _parentEl = document.querySelector('.bookmarks__list');
    _error = 'Not bookmarks yet.Find a nice recipe and bookmark it !';
    _message = '';

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }

    addHandlerRenderBookmarks(handler) {
        window.addEventListener('load', handler);
    }

}

export default new BookmarksView();