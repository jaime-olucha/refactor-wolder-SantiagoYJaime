export class GamePresenter {
    _view;
    constructor(view) {
        this._view = view;
    }
    presentLetterAdded(row, column, letter) {
        this._view.drawLetter(row, column, letter);
    }
    presentLetterRemoved(row, column) {
        this._view.deleteLetter(row, column);
    }
    presentLetterState(row, column, state, letter) {
        this._view.changeCellState(row, column, state);
        this._view.changeKeyState(letter, state);
    }
    presentWordValidated(row, states, guess) {
        states.forEach((state, column) => this.presentLetterState(row, column, state, guess[column]));
    }
    presentGameOver(state, secretWord) {
        this._view.showGameOver(state, secretWord);
    }
}
