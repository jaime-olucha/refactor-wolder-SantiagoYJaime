import { Game } from "../../domain/entities/Game.js";
import { IGamePresenter } from "../ports/IGamePresenter.js";

export class RemoveLetterUseCase {
    constructor(private presenter: IGamePresenter) {}


    public execute(game: Game): void {
        if (game.canRemoveLetter()) game.removeLetter();
        this.presenter.presentLetterRemoved(game.currentWord.length);
    }
}