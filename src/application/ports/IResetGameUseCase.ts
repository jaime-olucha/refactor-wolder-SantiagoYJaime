import { Game } from "../../domain/entities/Game.js";

export interface IResetGameUseCase {
    execute(game: Game): void;
}