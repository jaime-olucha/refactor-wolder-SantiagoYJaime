import { Game } from "../../domain/entities/Game.js";
import { RemoveLetterUseCase } from "../useCasses/RemoveLetterUseCase.js";
import { ICommand } from "./ICommand.js";

export class RemoveLetterCommand implements ICommand {
    private readonly _useCase: RemoveLetterUseCase;

    constructor(useCase: RemoveLetterUseCase) {
        this._useCase = useCase;
    }

    public execute(game: Game): void {
        this._useCase.execute(game)
    }
}