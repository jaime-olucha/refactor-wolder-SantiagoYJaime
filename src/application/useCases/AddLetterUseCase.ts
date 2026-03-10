import { Game } from "../../domain/entities/Game.js";
import { IAddLetterUseCase } from "../ports/IAddLetterUseCase.js";
import { IGamePresenter } from "../ports/IGamePresenter.js";

export class AddLetterUseCase implements IAddLetterUseCase {
    constructor(private presenter: IGamePresenter) { }

    public execute(game: Game, letter: string): void {
        if (game.canAddLetter()) {
            game.addLetter(letter);
            this.presenter.presentLetterAdded(game.guesses.length + 1, game.currentWord.length - 1, letter);
        }
    }
}