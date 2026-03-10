import { IAddLetterUseCase } from "./IAddLetterUseCase.js";
import { IRemoveLetterUseCase } from "./IRemoveLetterUseCase.js";
import { ISubmitWordUseCase } from "./ISubmitWordUseCase.js";

export interface IGameUseCases {
    addLetter: IAddLetterUseCase;
    removeLetter: IRemoveLetterUseCase;
    submitWord: ISubmitWordUseCase;
}