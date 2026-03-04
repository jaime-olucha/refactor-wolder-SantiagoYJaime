import { GameState } from "../shared/types.js";
import { IGameUI } from "../shared/IGameUI.js";
import { IWordProvider } from "../shared/IWordProvider.js";
import { WordValidator } from "./WordValidator.js";
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "../shared/constants.js";

//Qué importa cada uno: IMPORTACIONES
//GameStatePara saber si estamos PLAYING, WON o LOST
//IGameUIEl contrato de la UI — no importa la clase concreta
// IWordProviderEl contrato del proveedor de palabras — no importa la clase concreta
// WordValidatorPara validar la palabra en submitWord()
// MAX_WORD_SIZE, MAX_ATTEMPTSPara saber cuándo la palabra está completa y cuándo se acaban los intentos

export class Game {
    private _secretWord: string;
    private _currentWord: string;
    private _currentRow: number;
    private _currentCol: number;
    private _gameState: GameState;
    private readonly _validator: WordValidator;
    private readonly _ui: IGameUI;
    private readonly _wordProvider: IWordProvider;

// Qué hace cada una:  PROPIEDADES
// _secretWord La palabra que hay que adivinar
// _currentWord Lo que el jugador lleva escrito en el turno actual
// _currentRow En qué fila/turno estamos (empieza en 1)
// _currentCol En qué columna escribirá la siguiente letra (0..4)
// _gameState Si estamos PLAYING, WON o LOST
// _validator Instancia de WordValidator para validar palabras
// _ui La interfaz visual — acepta cualquier IGameUI con la que se construya el juego.

    constructor(wordProvider: IWordProvider, ui: IGameUI) {
        this._wordProvider = wordProvider;
        this._secretWord = wordProvider.getRandomWord();
        this._currentWord = "";
        this._currentRow = 1;
        this._currentCol = 0;
        this._gameState = GameState.PLAYING;
        this._validator = new WordValidator();
        this._ui = ui;
    }

    // Qué hace el constructor:

    // Qué hace: 
    // recibe las dos dependencias por inyección (IWordProvider e IGameUI), las guarda y inicializa el estado limpio del juego. No sabe nada del DOM, no crea instancias concretas.

    public addLetter(char: string): void {
        if (this._gameState !== GameState.PLAYING) return; // Si el juego no está en curso, no hace nada
        if (this._currentCol >= MAX_WORD_SIZE) return; // Si ya hay 5 letras, no hace nada

        this._currentWord += char;
        this._ui.drawLetter(this._currentRow, this._currentCol, char);
        this._currentCol++;
    }

    public removeLetter(): void {
        if (this._gameState !== GameState.PLAYING) return;                  
        if (this._currentCol <= 0) return; // Si no hay letras, no hace nada
        this._currentCol--;
        this._currentWord = this._currentWord.slice(0, -1);    //
        this._ui.deleteLetter(this._currentRow, this._currentCol);
}

    public submitWord(): void {
        if (this._gameState !== GameState.PLAYING) return; // Si el juego no está en curso, no hace nada
        if (this._currentCol < MAX_WORD_SIZE) return; // Si no hay 5 letras, no hace nadaº
        const states = this._validator.validate(this._currentWord, this._secretWord);  // Valida la palabra y obtiene los estados de cada letra 
                                                                                       // Aquí se arregla el Bug #2 — las letras repetidas las gestiona WordValidator con su algoritmo de dos pasos, no Game

        states.forEach((state, col) => {
            this._ui.changeCellState(this._currentRow, col, state); // Cambia el estado visual de cada letra según el resultado de la validación
            this._ui.changeKeyState(this._currentWord[col], state); // Cambia el estado visual de la tecla en el teclado virtual
        
    // Aquí se arregla el Bug #4 — antes changeBackgroundKey nunca cambiaba el color real de la tecla, ahora sí se le pasa el state correcto

        });

        if (this._currentWord === this._secretWord) {
            this._gameState = GameState.WON;
            this._ui.onGameOver(GameState.WON);
            return;
        }

    // Qué hace:

    // Compara la palabra del jugador con la secreta
    // Si son iguales → cambia _gameState a WON y avisa a la UI
    // El return es importante — si ganó no necesita seguir comprobando nada más

        if (this._currentRow === MAX_ATTEMPTS) {
            this._gameState = GameState.LOST;
            this._ui.onGameOver(GameState.LOST);
            return;
        }

    // Qué hace:

    // Comprueba si estamos en el último intento
    // Si se acabaron los intentos → cambia _gameState a LOST y avisa a la UI
    // El return evita que se avance al siguiente turno innecesariamente    

        this._currentRow++;
        this._currentCol = 0;
        this._currentWord = "";
    }

    // Qué hace:
    // Avanza a la siguiente fila
    // Resetea la columna a 0 para empezar desde la izquierda
    // Limpia la palabra actual para el nuevo turno

    // Resetea la partida completa:
    // 1. Pide una nueva palabra secreta al proveedor
    // 2. Limpia el estado interno del juego (palabra, fila, columna, estado)
    // 3. Le dice a la UI que limpie el tablero visualmente
    public reset(): void {
        this._secretWord = this._wordProvider.getRandomWord(); // nueva palabra secreta
        this._currentWord = "";      // limpia la palabra que llevaba escrita el jugador
        this._currentRow = 1;        // vuelve a la primera fila
        this._currentCol = 0;        // vuelve a la primera columna
        this._gameState = GameState.PLAYING; // el juego vuelve a estar en curso
        this._ui.resetBoard();       // le pide a la UI que limpie celdas y teclas
    }   




}   