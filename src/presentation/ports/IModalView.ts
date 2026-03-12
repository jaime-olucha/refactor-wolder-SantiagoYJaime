import { GameState } from "../../domain/types/typesState.js";

export interface IModalView {
    showGameOver(state: GameState, secretWord: string): void;
}