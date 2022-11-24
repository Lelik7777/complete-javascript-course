import View from "./View";
import previewView from "./previewView";
class ResultsView extends View {
    _parentEl = document.querySelector('.results');
    _error = 'No recipes  found for your query. Please try again!';
    _message = '';

    _generateMarkup() {
        return this._data.map(res => previewView._generateMarkupPreview(res)).join('');
    }


}

export default new ResultsView();