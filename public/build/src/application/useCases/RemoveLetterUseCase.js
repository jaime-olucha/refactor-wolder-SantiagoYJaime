export class RemoveLetterUseCase {
    presenter;
    constructor(presenter) {
        this.presenter = presenter;
    }
    execute(game) {
        if (game.canRemoveLetter()) {
            game.removeLetter();
            this.presenter.presentLetterRemoved(game.guesses.length + 1, game.currentWord.length);
        }
    }
}
