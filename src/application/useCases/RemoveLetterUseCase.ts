import { Game } from "../../domain/entities/Game.js";
import { IGamePresenter } from "../ports/IGamePresenter.js";
import { IRemoveLetterUseCase } from "../ports/IRemoveLetterUseCase.js";

export class RemoveLetterUseCase implements IRemoveLetterUseCase {
    constructor(private readonly _presenter: IGamePresenter) { }

    execute(game: Game): void {
        if (game.canRemoveLetter()) {
            const column = game.currentWord.length - 1;
            const row = game.guesses.length + 1;
            game.removeLetter();
            this._presenter.presentLetterRemoved(row, column);
        }
    }
}