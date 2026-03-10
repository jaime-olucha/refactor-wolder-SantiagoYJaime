import { Game } from "../../domain/entities/Game.js";

export class AddLetterUseCase {
    public execute(game: Game, letter: string): void {
        if (game.canAddLetter()) game.addLetter(letter);
    }
}