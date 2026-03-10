import { Game } from "../../domain/entities/Game";
import { WordValidator } from "../../domain/services/WordValidator";
import { LetterState } from "../../domain/types/typesState";

export class SubmitWordUseCase {
    private validator: WordValidator;

    constructor(validator: WordValidator){
        this.validator = validator;
    }

    public execute(game: Game): LetterState[] | null {
        if(!game.canSubmit()) {
            return null;
        }
        const guess = game.currentWord;
        const target = game.secretWord;

        const states = this.validator.validate(guess, target);

        game.submitWord();
        return states;
    }
}