export class AddLetterUseCase {
    presenter;
    constructor(presenter) {
        this.presenter = presenter;
    }
    execute(game, letter) {
        if (game.canAddLetter()) {
            game.addLetter(letter);
            this.presenter.presentLetterAdded(game.guesses.length + 1, game.currentWord.length - 1, letter);
        }
    }
}
