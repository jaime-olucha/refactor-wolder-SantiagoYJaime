import { Game } from "../../domain/entities/Game.js";
import { IWordRepository } from "../../domain/repositories/IWordRepository.js";
import { IGamePresenter } from "../ports/IGamePresenter.js";
import { IResetGameUseCase } from "../ports/IResetGameUseCase.js";

export class ResetGameUseCase implements IResetGameUseCase {
    private readonly _repository: IWordRepository;
    private readonly _presenter: IGamePresenter;

    constructor(repository: IWordRepository, presenter: IGamePresenter) {
        this._repository = repository;
        this._presenter = presenter;
    }

    execute(game: Game): void {
        const newWord = this._repository.getRandomWord();
        game.reset(newWord);
        this._presenter.presentGameReset();
    }
}