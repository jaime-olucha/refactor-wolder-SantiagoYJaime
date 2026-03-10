import { Game } from "../../domain/entities/Game.js";

export class RemoveLetterUseCase {
    public execute(game: Game): void {
        if (game.canRemoveLetter()) game.removeLetter();
    }
}