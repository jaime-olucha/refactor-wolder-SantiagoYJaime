import { Game } from "../../domain/entities/Game.js";
import { IWordValidator } from "../../domain/services/IWordValidator.js";
import { GameState } from "../../domain/types/typesState.js";
import { IGamePresenter } from "../ports/IGamePresenter.js";
import { LetterState } from "../../domain/types/typesState.js";

export class SubmitWordUseCase {
    private readonly _validator: IWordValidator;
    private readonly _presenter: IGamePresenter;

    constructor(validator: IWordValidator, presenter: IGamePresenter) {
        this._validator = validator;
        this._presenter = presenter;
    }

    public execute(game: Game): void {
        if (!game.canSubmit()) return;

        const states = this.validateCurrentWord(game);
        const currentRow = game.guesses.length + 1;

        game.submitWord();

        this.presentValidation(currentRow, states, game.currentWord);
        this.presentGameOverIfNeeded(game);
    }

    private validateCurrentWord(game: Game): LetterState[] {
        return this._validator.validate(game.currentWord, game.secretWord);
    }

    private presentValidation(row: number, states: LetterState[], guess: string): void {
        this._presenter.presentWordValidated(row, states, guess);
    }

    private presentGameOverIfNeeded(game: Game): void {
        if (game.gameState !== GameState.PLAYING) {
            this._presenter.presentGameOver(game.gameState, game.secretWord);
        }
    }
}