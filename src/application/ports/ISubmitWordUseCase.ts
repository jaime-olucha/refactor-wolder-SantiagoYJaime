import { Game } from "../../domain/entities/Game.js";

export interface ISubmitWordUseCase {
    execute(game: Game): void;
}