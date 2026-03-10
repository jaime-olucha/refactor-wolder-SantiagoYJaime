import { Game } from "../../domain/entities/Game";

export class AddLetterUseCase {
    public execute(game: Game, letter: string): void {
        if (game.canAddLetter()) game.addLetter(letter);
    }
}