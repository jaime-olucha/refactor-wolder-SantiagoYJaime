import { GameState } from "../../domain/types/typesState.js";
export class SubmitWordUseCase {
    _validator;
    _presenter;
    constructor(validator, presenter) {
        this._validator = validator;
        this._presenter = presenter;
    }
    execute(game) {
        if (!game.canSubmit())
            return;
        const guess = game.currentWord;
        const states = this.validateCurrentWord(game);
        const currentRow = game.guesses.length + 1;
        game.submitWord();
        this.presentValidation(currentRow, states, guess);
        this.presentGameOverIfNeeded(game);
    }
    validateCurrentWord(game) {
        return this._validator.validate(game.currentWord, game.secretWord);
    }
    presentValidation(row, states, guess) {
        this._presenter.presentWordValidated(row, states, guess);
    }
    presentGameOverIfNeeded(game) {
        if (game.gameState !== GameState.PLAYING) {
            this._presenter.presentGameOver(game.gameState, game.secretWord);
        }
    }
}
