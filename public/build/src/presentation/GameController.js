import { GameState } from "../domain/types/typesState.js";
import { VALID_KEYS, COMMANDS } from "../shared/gameConfig.js";
export class GameController {
    _game;
    _useCases;
    constructor(game, useCases) {
        this._game = game;
        this._useCases = useCases;
    }
    handleInput(key) {
        if (this._game.gameState !== GameState.PLAYING)
            return;
        if (key === COMMANDS.ENTER)
            return this._useCases.submitWord.execute(this._game);
        if (key === COMMANDS.BACKSPACE)
            return this._useCases.removeLetter.execute(this._game);
        if (VALID_KEYS.test(key))
            return this._useCases.addLetter.execute(this._game, key);
    }
    handleRestart() {
        this._useCases.resetGame.execute(this._game);
    }
}
