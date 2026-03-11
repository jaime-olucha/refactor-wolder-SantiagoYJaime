export class AddLetterUseCase {
    _presenter;
    constructor(_presenter) {
        this._presenter = _presenter;
    }
    execute(game, letter) {
        if (game.canAddLetter()) {
            const column = game.currentWord.length;
            const row = game.guesses.length + 1;
            game.addLetter(letter);
            this._presenter.presentLetterAdded(row, column, letter);
        }
    }
}
