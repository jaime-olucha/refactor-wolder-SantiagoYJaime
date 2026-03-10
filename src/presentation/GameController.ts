import { Game } from "../domain/entities/Game";
import { AddLetterUseCase } from "../application/useCases/addLetterUseCase";
import { RemoveLetterUseCase } from "../application/useCases/RemoveLetterUseCase";
import { SubmitWordUseCase } from "../application/useCases/SubmitWordUseCase";
import { AddLetterCommand } from "../application/commands/AddLetterCommand";
import { RemoveLetterCommand } from "../application/commands/RemoveLetterCommand";
import { SubmitWordCommand } from "../application/commands/SubmitWordCommand";
import { GameState } from "../domain/types/typesState";
import { VALID_KEYS, COMMANDS } from "../shared/gameConfig.js"

export class GameController {
    private readonly _game: Game;
    private readonly _addLetterUseCase: AddLetterUseCase;
    private readonly _removeLetterUseCase: RemoveLetterUseCase;
    private readonly _submitWordUseCase: SubmitWordUseCase;

    constructor(game: Game, addLetterUseCase: AddLetterUseCase, removeLetterUseCase: RemoveLetterUseCase, submitWordUseCase: SubmitWordUseCase) {
        this._game = game;
        this._addLetterUseCase = addLetterUseCase;
        this._removeLetterUseCase = removeLetterUseCase;
        this._submitWordUseCase = submitWordUseCase;
    }

    public handleInput(key: string):void {
        if(this._game.gameState !== GameState.PLAYING) return;

        if(key === COMMANDS.ENTER) {
            const command = new SubmitWordCommand(this._submitWordUseCase);
            command.execute(this._game)
        
        } else if(key === COMMANDS.BACKSPACE) {
            const command = new RemoveLetterCommand(this._removeLetterUseCase);
            command.execute(this._game);
        
        } else if(VALID_KEYS.test(key)) {
            const command = new AddLetterCommand(this._addLetterUseCase, key);
            command.execute(this._game)
        }
    }
}

