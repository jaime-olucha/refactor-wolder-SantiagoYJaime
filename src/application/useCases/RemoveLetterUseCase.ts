import { Game } from "../../domain/entities/Game.js";
import { IGamePresenter } from "../ports/IGamePresenter.js";
import { IRemoveLetterUseCase } from "../ports/IRemoveLetterUseCase.js";

export class RemoveLetterUseCase implements IRemoveLetterUseCase {
    constructor(private presenter: IGamePresenter) { }

    public execute(game: Game): void {
        if (game.canRemoveLetter()) {
            game.removeLetter();
            this.presenter.presentLetterRemoved(game.guesses.length + 1, game.currentWord.length);
        }
    }
}