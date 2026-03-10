import { Game } from "../../domain/entities/Game.js";

export interface ICommand {
    execute(game: Game): void;
}