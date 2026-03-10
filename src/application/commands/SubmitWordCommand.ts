import { Game } from "../../domain/entities/Game";
import { SubmitWordUseCase } from "../useCasses/SubmitWordUseCase";
import { ICommand } from "./ICommand";

export class SubmitWordCommand implements ICommand {
    private readonly _useCase: SubmitWordUseCase;

    constructor(useCase: SubmitWordUseCase) {
        this._useCase = useCase;
    }

    public execute(game: Game): void {
        this._useCase.execute(game)
    }
}