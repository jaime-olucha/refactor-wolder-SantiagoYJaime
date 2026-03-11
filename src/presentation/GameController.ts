import { Game } from "../domain/entities/Game.js";
import { IInputHandler } from "./ports/IInputHandler.js";
import { IGameUseCases } from "../application/ports/IGameUseCases.js";
import { GameState } from "../domain/types/typesState.js";
import { VALID_KEYS, COMMANDS } from "../shared/gameConfig.js";

export class GameController implements IInputHandler {
    private readonly _game: Game;
    private readonly _useCases: IGameUseCases;

    constructor(game: Game, useCases: IGameUseCases) {
        this._game = game;
        this._useCases = useCases;
    }

    handleInput(key: string): void {
        if (this._game.gameState !== GameState.PLAYING) return;

        if (key === COMMANDS.ENTER) return this._useCases.submitWord.execute(this._game);
        if (key === COMMANDS.BACKSPACE) return this._useCases.removeLetter.execute(this._game);
        if (VALID_KEYS.test(key)) return this._useCases.addLetter.execute(this._game, key);
    }

    handleRestart(): void {
        this._useCases.resetGame.execute(this._game);
    }
}