import { Game } from "../../domain/entities/Game.js";

export interface IAddLetterUseCase {
    execute(game: Game, letter: string): void;
}