import { IAddLetterUseCase } from "./IAddLetterUseCase.js";
import { IRemoveLetterUseCase } from "./IRemoveLetterUseCase.js";
import { IResetGameUseCase } from "./IResetGameUseCase.js";
import { ISubmitWordUseCase } from "./ISubmitWordUseCase.js";

export interface IGameUseCases {
    addLetter: IAddLetterUseCase;
    removeLetter: IRemoveLetterUseCase;
    submitWord: ISubmitWordUseCase;
    resetGame: IResetGameUseCase;
}