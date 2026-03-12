export class GamePresenter {
    _views;
    constructor(views) {
        this._views = views;
    }
    presentLetterAdded(row, column, letter) {
        this._views.cell.drawLetter(row, column, letter);
    }
    presentLetterRemoved(row, column) {
        this._views.cell.deleteLetter(row, column);
    }
    presentWordValidated(row, states, guess) {
        states.forEach((state, column) => this.presentLetterState(row, column, state, guess[column]));
    }
    presentGameOver(state, secretWord) {
        this._views.modal.showGameOver(state, secretWord);
    }
    presentGameReset() {
        this._views.reset.resetGame();
    }
    presentLetterState(row, column, state, letter) {
        this._views.cell.changeCellState(row, column, state);
        this._views.keyboard.changeKeyState(letter, state, column);
    }
}
