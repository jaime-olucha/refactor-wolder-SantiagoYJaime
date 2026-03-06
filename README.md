---

# 🟩 Wordle Refactorizado — Clean Code + SOLID

> Refactorización del juego Wordle aplicando principios **Clean Code** y **SOLID** en TypeScript.  
> Proyecto de formación 480 · Santiago & Jaime

---

<iframe width="100%" 
        height="900" 
        src="https://jaime-olucha.github.io/refactor-wolder-SantiagoYJaime/README-arquitectura-wordle.html"
        title="Clean Code SOLID TypeScript" 
        sandbox="allow-scripts allow-same-origin">
</iframe>

---

## 🚀 Cómo ejecutar

```bash
npm install
npm start
```

Abre el navegador en [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Estructura de carpetas

```
📦 refactor-wolder-SantiagoYJaime
│
├── 📂 public/
│   ├── 📂 style/
│   │   ├── fondo.png
│   │   └── style.css
│   └── index.html
│
├── 📂 src/
│   │
│   ├── 📂 domain/              🧠 Lógica pura · Sin DOM · Sin CSS
│   │   ├── Game.ts
│   │   ├── WordProvider.ts
│   │   └── WordValidator.ts
│   │
│   ├── 📂 infrastructure/      🖥️ DOM, Eventos y Visual
│   │   ├── 📂 config/
│   │   │   └── uiConfig.ts
│   │   ├── InputManager.ts
│   │   └── UI.ts
│   │
│   ├── 📂 shared/              🤝 Contratos, Interfaces y Constantes
│   │   ├── constants.ts
│   │   ├── IGameUI.ts
│   │   ├── IWordProvider.ts
│   │   ├── IWordValidator.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   │
│   └── App.ts                  ⚡ Entry Point · Orquestador
│
└── package.json
```

---

## ⚡ App.ts — Entry Point

Crea todas las instancias e inyecta las dependencias entre capas. Punto de arranque de la SPA.

```ts
const wordProvider = new WordProvider(WORDS_DB);
const validator    = new WordValidator();
const ui           = new UI();
const game         = new Game(wordProvider, validator, ui);

new InputManager(handleKeyPress, () => game.reset());
```

---

## 🧠 src/domain — Lógica pura

> Esta capa **no sabe que existe el navegador**. Sin HTML, sin CSS, sin eventos.

### 📄 Game.ts

Máquina de estados del juego. Orquesta turnos, letras y el ciclo victoria/derrota.  
Solo conoce las **interfaces**, nunca las clases concretas.

| Tipo | Método / Propiedad | Descripción |
|------|-------------------|-------------|
| `private` | `_secretWord: string` | Palabra secreta de la partida |
| `private` | `_currentWord: string` | Letras escritas en el turno actual |
| `private` | `_currentRow: number` | Fila activa (1–6) |
| `private` | `_currentCol: number` | Columna activa (0–4) |
| `private` | `_gameState: GameState` | Estado actual: PLAYING / WON / LOST |
| `private` | `_validator: IWordValidator` | Inyectado por constructor |
| `private` | `_ui: IGameUI` | Inyectado por constructor |
| `private` | `_wordProvider: IWordProvider` | Inyectado por constructor |
| `public` | `addLetter(char)` | Añade letra si la partida está activa y col < 5. Llama `_ui.drawLetter()` |
| `public` | `removeLetter()` | Borra la última letra. Actualiza `_currentWord`. Llama `_ui.deleteLetter()` |
| `public` | `submitWord()` | Valida 5 letras, aplica estados, detecta victoria/derrota, avanza turno |
| `public` | `reset()` | Reinicia el estado interno y llama `_ui.resetBoard()` |
| `private` | `isGameActive()` | Devuelve `true` si `_gameState === PLAYING` |

---

### 📄 WordValidator.ts

Servicio **puro sin estado**. Calcula el resultado de cada intento.  
✅ Resuelve el bug de **letras repetidas**.

| Tipo | Método | Descripción |
|------|--------|-------------|
| `public` | `validate(guess, target) → LetterState[]` | 1º marca verdes (CORRECT), 2º marca naranjas (PRESENT) evitando duplicados |
| `private` | `markCorrectLetters(guess[], target[], result[])` | Primera pasada: coincidencias exactas |
| `private` | `markPresentLetters(guess[], target[], result[])` | Segunda pasada: letras presentes en otra posición |

> Implementa: `IWordValidator`

---

### 📄 WordProvider.ts

Gestiona el banco de palabras. Recibe el array por **inyección de dependencias**.

| Tipo | Método | Descripción |
|------|--------|-------------|
| `constructor` | `constructor(words: string[])` | Recibe el array de palabras |
| `public` | `getRandomWord() → string` | `Math.floor(Math.random() * words.length)` → `toUpperCase()` |

> Implementa: `IWordProvider`

---

## 🖥️ src/infrastructure — DOM, Eventos y Visual

> Única capa que toca el DOM (`document`, `addEventListener`, etc.).

### 📄 UI.ts

Implementa `IGameUI`. Dibuja letras, aplica animaciones flip, gestiona estados del teclado visual y el modal de fin de partida.

| Tipo | Método | Descripción |
|------|--------|-------------|
| `public` | `drawLetter(row, col, letter)` | Escribe la letra en la celda del DOM |
| `public` | `deleteLetter(row, col)` | Limpia `textContent` de la celda |
| `public` | `changeCellState(row, col, state)` | Aplica animación flip + clase CSS de color |
| `public` | `changeKeyState(key, state)` | Actualiza el color de la tecla virtual (respeta jerarquía CORRECT > PRESENT) |
| `public` | `onGameOver(state, secretWord)` | Muestra el modal de victoria o derrota |
| `public` | `resetBoard()` | Llama a `resetCells()` + `resetKeys()` |
| `public` | `hideModal()` | Oculta el modal de fin de partida |
| `private` | `getCellElement(row, col)` | Obtiene el elemento HTML de una celda |
| `private` | `getModalElement()` | Obtiene el elemento HTML del modal |
| `private` | `setElementState(el, state)` | Aplica la clase CSS correspondiente al estado |
| `private` | `resetCells()` | Limpia todas las celdas del tablero |
| `private` | `resetKeys()` | Limpia todos los colores del teclado virtual |

> Implementa: `IGameUI`

---

### 📄 InputManager.ts

Gestiona todos los eventos de entrada: teclado físico (`keydown`/`keyup`), teclado virtual (`click`) y botón nueva partida.

| Tipo | Método | Descripción |
|------|--------|-------------|
| `constructor` | `onKeyPress: (key) => void` | Callback inyectado para manejar teclas |
| `constructor` | `onNewGame: () => void` | Callback inyectado para nueva partida |
| `private` | `initPhysicalKeyboard()` | Escucha `keydown`/`keyup` en el documento |
| `private` | `initVirtualKeyboard()` | Escucha `click` en cada botón del teclado visual |
| `private` | `initNewGameButton()` | Escucha `click` en el botón de nueva partida |
| `private` | `toUpperKey(key)` | Normaliza la tecla llamando a `normalize()` |
| `private` | `getVirtualButton(key)` | Busca el botón HTML del teclado virtual |

---

### 📄 config/uiConfig.ts

Centraliza todos los **magic strings** del DOM: selectores CSS, clases de estado, tiempos de animación y textos del modal.

| Constante | Contenido |
|-----------|-----------|
| `UI_CONFIG.SELECTORS` | `.VIRTUAL_CELL`, `.VIRTUAL_KEY`, `.PLAY_AGAIN_BTN`, `.MODAL_HEADER`, `.MODAL_MESSAGE`, `.MODAL_SECRET_WORD` |
| `UI_CONFIG.CSS_CLASSES` | Mapea `LetterState` → clase CSS (`cell-correct`, `cell-present`, etc.) |
| `UI_CONFIG.ANIMATION.FLIP_ANIMATION` | `.CLASS`, `.COLUMN_DELAY`, `.CELL_DELAY`, `.AWAIT_DELAY` |
| `UI_CONFIG.MODAL` | `.CLASSES`, `.MESSAGES`, `.HEADER_CLASSES` |
| `ALL_STATE_CLASSES` | Array con todas las clases de estado para limpiar elementos |

---

## 🤝 src/shared — Contratos, Interfaces y Constantes

> Sin lógica. Solo las reglas de comunicación entre capas.

### 📄 IGameUI.ts

Contrato del renderer visual. `Game` solo depende de esta interfaz, nunca de `UI` directamente.

```ts
interface IGameUI {
    drawLetter(row: number, col: number, letter: string): void;
    deleteLetter(row: number, col: number): void;
    changeCellState(row: number, col: number, state: LetterState): void;
    changeKeyState(key: string, state: LetterState): void;
    onGameOver(state: GameState, secretWord: string): void;
    resetBoard(): void;
}
```

### 📄 IWordProvider.ts

```ts
interface IWordProvider {
    getRandomWord(): string;
}
```

### 📄 IWordValidator.ts

```ts
interface IWordValidator {
    validate(guess: string, target: string): LetterState[];
}
```

### 📄 types.ts

```ts
enum LetterState { CORRECT, PRESENT, ABSENT }
enum GameState   { PLAYING, WON, LOST }
```

### 📄 constants.ts

```ts
MAX_WORD_SIZE = 5
MAX_ATTEMPTS  = 6
VALID_KEYS    = ['A', 'B', ... 'Z', 'Ñ']
COMMANDS      = { ENTER, BACKSPACE }
WORDS_DB      = [ ...banco de palabras... ]
```

### 📄 utils.ts

| Función | Descripción |
|---------|-------------|
| `normalize(key: string) → string` | Convierte teclas físicas a mayúsculas. Gestiona tildes, Ñ, ENTER y BACKSPACE |

---

## 🏛️ Principios SOLID aplicados

| Principio | Cómo se aplica |
|-----------|---------------|
| **S** — Single Responsibility | Cada clase tiene una sola responsabilidad: `UI` dibuja, `Game` orquesta, `WordValidator` valida, `InputManager` gestiona eventos |
| **O** — Open/Closed | `Game` no necesita cambiar si se sustituye `UI` o `WordValidator` por otra implementación |
| **L** — Liskov Substitution | `UI` implementa completamente `IGameUI` sin romper el contrato |
| **I** — Interface Segregation | Interfaces pequeñas y específicas: `IGameUI`, `IWordProvider`, `IWordValidator` |
| **D** — Dependency Inversion | `Game` depende de abstracciones (interfaces), no de clases concretas |

---

## 🐛 Bugs corregidos respecto al original

| # | Archivo original | Bug | Solución |
|---|-----------------|-----|----------|
| 1 | `Game.ts` | `backspacePressed()` y `newKeyPressed()` duplicados | Unificado en `addLetter()`, `removeLetter()`, `submitWord()` |
| 2 | `Game.ts` | `checkMisplacedLetters` falla con letras repetidas | `WordValidator` con doble pasada (verdes primero, luego naranjas) |
| 3 | `Game.ts` | `backspacePressed()` no actualizaba `_actualWord` | `removeLetter()` actualiza correctamente con `.slice(0, -1)` |
| 4 | `Interfaze.ts` | `changeBackgroundKey` no cambiaba el color de la tecla | `changeKeyState()` en `UI.ts` con jerarquía CORRECT > PRESENT |
| 5 | `Words.ts` | Fórmula de número aleatorio confusa | `Math.floor(Math.random() * words.length)` limpio en `WordProvider` |
| 6 | `Game.ts` | Comentarios mezclados e inconsistentes | Eliminados, el código se explica solo |
