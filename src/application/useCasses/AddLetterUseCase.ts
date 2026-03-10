import { Game } from "../../domain/entities/Game.js";
import { IGamePresenter } from "../ports/IGamePresenter.js";

export class AddLetterUseCase {
    constructor(private presenter: IGamePresenter) {}

    public execute(game: Game, letter: string): void {
        if (game.canAddLetter()) game.addLetter(letter);

        this.presenter.presentLetterAdded(game.currentWord.length - 1, letter);
    }
}