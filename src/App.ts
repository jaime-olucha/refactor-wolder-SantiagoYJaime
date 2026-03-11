import { LocalWordRepository } from "./infrastructure/repositories/LocalWordRepository.js";
import { UI } from "./infrastructure/ui/UI.js";
import { GamePresenter } from "./presentation/GamePresenter.js";
import { WordValidator } from "./domain/services/WordValidator.js";
import { AddLetterUseCase } from "./application/useCases/AddLetterUseCase.js";
import { RemoveLetterUseCase } from "./application/useCases/RemoveLetterUseCase.js";
import { SubmitWordUseCase } from "./application/useCases/SubmitWordUseCase.js";
import { ResetGameUseCase } from "./application/useCases/ResetGameUseCase.js";
import { Game } from "./domain/entities/Game.js";
import { GameController } from "./presentation/GameController.js";
import { InputManager } from "./infrastructure/input/InputManager.js";
import { IGameUseCases } from "./application/ports/IGameUseCases.js";

document.addEventListener('DOMContentLoaded', () => {

    const repository = new LocalWordRepository();
    const view = new UI();

    const presenter = new GamePresenter(view);

    const validator = new WordValidator();

    const addLetterUseCase = new AddLetterUseCase(presenter);
    const removeLetterUseCase = new RemoveLetterUseCase(presenter);
    const submitWordUseCase = new SubmitWordUseCase(validator, presenter);
    const resetGameUseCase = new ResetGameUseCase(repository, presenter);

    const useCases: IGameUseCases = {
        addLetter: addLetterUseCase,
        removeLetter: removeLetterUseCase,
        submitWord: submitWordUseCase,
        resetGame: resetGameUseCase
    };

    const secretWord = repository.getRandomWord();
    const game = new Game(secretWord);
    const controller = new GameController(game, useCases);
    new InputManager(controller);
});