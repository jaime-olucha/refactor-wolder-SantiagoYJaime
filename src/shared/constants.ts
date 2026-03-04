export const MAX_WORD_SIZE:number = 5;
export const MAX_ATTEMPTS:number = 6;
export const VALID_KEYS: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N','Ñ','O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export const COMMANDS = {
    ENTER: 'ENTER',
    BACKSPACE: 'BACKSPACE'
} as const

export const WORDS_DB: string[] = [
    "JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", 
    "PLAYA", "PLATA", "ARBOL", "QUESO", "NIÑOS"
];




// Se exportan las constantes para que puedan ser utilizadas en otros archivos del proyecto, como en Game.ts e Interface.ts.
// Estas constantes definen el tamaño máximo de la palabra, el número máximo de intentos y las teclas válidas que se pueden presionar durante el juego.
// Cualquier dev que busque configuración solo tiene un lugar donde mirar.
// Lo que facilita el mantenimiento y la actualización de estas constantes en el futuro.

