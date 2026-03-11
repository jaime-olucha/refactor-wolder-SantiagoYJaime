export class RemoveLetterUseCase {
    _presenter;
    constructor(_presenter) {
        this._presenter = _presenter;
    }
    execute(game) {
        if (game.canRemoveLetter()) {
            const column = game.currentWord.length - 1;
            const row = game.guesses.length + 1;
            game.removeLetter();
            this._presenter.presentLetterRemoved(row, column);
        }
    }
}
