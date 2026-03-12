export class UI {
    _cellManager;
    _keyboardManager;
    _modalManager;
    constructor(cellManager, keyboardManager, modalManager) {
        this._cellManager = cellManager;
        this._keyboardManager = keyboardManager;
        this._modalManager = modalManager;
    }
    drawLetter(row, column, letter) {
        this._cellManager.drawLetter(row, column, letter);
    }
    deleteLetter(row, column) {
        this._cellManager.deleteLetter(row, column);
    }
    changeCellState(row, column, state) {
        this._cellManager.changeCellState(row, column, state);
    }
    changeKeyState(key, state, column) {
        this._keyboardManager.changeKeyState(key, state, column);
    }
    showGameOver(state, secretWord) {
        this._modalManager.showGameOver(state, secretWord);
    }
    resetGame() {
        this._cellManager.resetCells();
        this._keyboardManager.resetKeys();
        this._modalManager.hideModal();
    }
}
