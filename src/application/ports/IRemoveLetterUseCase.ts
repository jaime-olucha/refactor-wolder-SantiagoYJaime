import { Game } from "../../domain/entities/Game.js";

export interface IRemoveLetterUseCase {
    execute(game: Game): void;
}