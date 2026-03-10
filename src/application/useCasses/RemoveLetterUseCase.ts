import { Game } from "../../domain/entities/Game";

export class RemoveLetterUseCase {
    public execute(game: Game): void {
        if (game.canRemoveLetter()) game.removeLetter();
    }
}