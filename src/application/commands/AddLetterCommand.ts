import { Game } from "../../domain/entities/Game";
import { AddLetterUseCase } from "../useCases/addLetterUseCase";
import { ICommand } from "./ICommand";

export class AddLetterCommand implements ICommand {
    private readonly _useCase: AddLetterUseCase;
    private readonly _letter: string;

    constructor(useCase: AddLetterUseCase, letter: string) {
        this._useCase = useCase;
        this._letter = letter;
    }

    public execute(game: Game): void {
        this._useCase.execute(game, this._letter);
    }
}