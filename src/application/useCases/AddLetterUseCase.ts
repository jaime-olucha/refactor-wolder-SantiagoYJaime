import { Game } from "../../domain/entities/Game.js";
import { IAddLetterUseCase } from "../ports/IAddLetterUseCase.js";
import { IGamePresenter } from "../ports/IGamePresenter.js";

export class AddLetterUseCase implements IAddLetterUseCase {
    constructor(private readonly _presenter: IGamePresenter) { }

    execute(game: Game, letter: string): void {
        if (game.canAddLetter()) {
            const column = game.currentWord.length;
            const row = game.guesses.length + 1;
            game.addLetter(letter);
            this._presenter.presentLetterAdded(row, column, letter);
        }
    }
}