# 🟩 Wordle Refactorizado — Clean Code + SOLID

> Refactorización del juego Wordle aplicando principios **Clean Code** y **SOLID** en TypeScript.  
> Proyecto de formación 480 · Santiago & Jaime

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
├── 📄 index.html                <-- Esqueleto visual de la app
├── 📁 style/
│   └── 📄 style.css             <-- Estilos y variables CSS
│
├── 📁 src/
│   ├── 📄 app.ts                <-- COMPOSITION ROOT (Ensamblador)
│   │
│   ├── 📁 domain/               <-- 🟡 DOMAIN (Lógica de negocio pura)
│   │   ├── 📁 entities/
│   │   ├── 📁 repositories/
│   │   ├── 📁 services/
│   │   └── 📁 types/
│   │
│   ├── 📁 application/          <-- 🔴 APLICACION (CASOS DE USO)
│   │   ├── 📁 ports/
│   │   └── 📁 useCases/
│   │
│   ├── 📁 presentation/         <-- 🟢 PRESENTACION (Los adaptadores)
│   │   └── 📁 ports/
│   │       ├── 📄 ICellView.ts
│   │       ├── 📄 IKeyboardView.ts
│   │       ├── 📄 IModalView.ts
│   │       ├── 📄 IResetView.ts
│   │       ├── 📄 IGameViews.ts
│   │       └── 📄 IInputHandler.ts
│   │
│   ├── 📁 infrastructure/       <-- 🔵 INFRASTRUCTURA (DOM, DBs...)
│   │   ├── 📁 config/
│   │   ├── 📁 input/
│   │   ├── 📁 repositories/
│   │   └── 📁 ui/
│   │       ├── 📄 UI.ts
│   │       ├── 📁 components/
│   │       │   ├── 📄 CellManager.ts
│   │       │   ├── 📄 KeyboardManager.ts
│   │       │   └── 📄 ModalManager.ts
│   │       └── 📁 helpers/
│   │           └── 📄 domHelpers.ts
│   │
│   └── 📁 shared/               <-- ⚪ SHARED (código transversal)
│       ├── 📄 gameConfig.ts
│       └── 📄 utils.ts
└── package.json
```

---

## 1. Capa de Dominio

Es el corazón de la aplicación. No importa (import) absolutamente nada de otras capas. Aquí residen las reglas matemáticas e inmutables del juego.

- `entities/Game.ts`: La Entidad principal. Gestiona su propio estado interno (intentos, palabra actual, si se ha ganado o perdido) mediante encapsulamiento estricto y métodos defensivos. Excluye cualquier lógica externa.

- `services/WordValidator.ts`: Contiene el algoritmo core del juego. Compara el intento del usuario con la palabra secreta manejando casos complejos (como letras repetidas) devolviendo un array de estados (CORRECT, PRESENT, ABSENT).

- `repositories/IWordRepository.ts` & `services/IWordValidator.ts`: Interfaces puras (Puertos). Definen los contratos que el dominio necesita para sobrevivir, sin importarle quién los implemente.

- `types/typesState.ts`: Enums que definen los estados posibles de las letras y del propio juego.

---

## 2. Capa de Aplicación

Contiene los "Casos de Uso", los trabajadores que orquestan el flujo de información utilizando las piezas del Dominio.

- `useCases/AddLetterUseCase.ts`, `RemoveLetterUseCase.ts`, `SubmitWordUseCase.ts`, `ResetGameUseCase.ts`: Cada archivo tiene una única responsabilidad (SRP). Reciben el juego, capturan el estado **antes de mutar** para evitar acoplamientos temporales, ejecutan la acción permitida en el dominio y avisan al Presentador del resultado.

- `ports/IGameUseCases.ts`: Actúa como un Input Boundary o Parameter Object. Agrupa todos los casos de uso para evitar inyectar múltiples dependencias en el Controlador (evita el constructor telegráfico).

- `ports/IAddLetterUseCase.ts`, `IRemoveLetterUseCase.ts`, `ISubmitWordUseCase.ts`, `IResetGameUseCase.ts`: Una interfaz específica por cada caso de uso. Esto aplica ISP al máximo: cada cliente depende exactamente del contrato que necesita, sin métodos sobrantes. Las firmas distintas (`execute(game, letter)` vs `execute(game)`) justifican la segregación frente a una interfaz genérica.

- `ports/IGamePresenter.ts`: El Output Port. El contrato que obliga a la siguiente capa a saber cómo comunicar los cambios visuales.

---

## 3. Capa de Presentación

Son los traductores. Transforman los estímulos externos en formato que la Aplicación entienda, y viceversa.

- `GameController.ts`: Implementa `IInputHandler`. Recibe teclas normalizadas (del InputManager) y decide qué Caso de Uso debe ejecutarse (ENTER, BACKSPACE o letra).

- `GamePresenter.ts`: Implementa `IGamePresenter`. Recibe datos crudos de los Casos de Uso (ej: fila 1, columna 2, estado CORRECT) y delega en la vista correcta a través de `IGameViews`.

- `ports/ICellView.ts`: Contrato para las operaciones sobre las celdas del grid (dibujar, borrar, cambiar estado).

- `ports/IKeyboardView.ts`: Contrato para las operaciones sobre el teclado virtual (cambiar estado de una tecla).

- `ports/IModalView.ts`: Contrato para las operaciones sobre el modal de fin de partida.

- `ports/IResetView.ts`: Contrato para la operación de reinicio visual del juego.

- `ports/IGameViews.ts`: Parameter Object que agrupa `ICellView`, `IKeyboardView`, `IModalView` e `IResetView`. Permite que `GamePresenter` reciba un único parámetro limpio en su constructor y acceda solo a la vista que necesita en cada método, aplicando ISP de forma estricta.

- `ports/IInputHandler.ts`: Contrato que separa al Controlador de la tecnología real de entrada.

---

## 4. Capa de Infraestructura

Aquí es donde el código se ensucia las manos con la tecnología específica (El DOM del navegador). Es la capa más volátil y fácil de reemplazar.

- `ui/UI.ts`: Patrón **Fachada**. Implementa `ICellView`, `IKeyboardView`, `IModalView` e `IResetView`. No contiene lógica propia — delega cada operación al manager correspondiente y coordina el reset de los tres. Es el único punto del sistema que conoce los managers concretos.

- `ui/components/CellManager.ts`: Responsabilidad única sobre las celdas del grid. Gestiona `drawLetter`, `deleteLetter`, `changeCellState` y `resetCells`. Implementa `ICellView`.

- `ui/components/KeyboardManager.ts`: Responsabilidad única sobre el teclado virtual. Gestiona `changeKeyState` y `resetKeys` con la jerarquía de prioridad de estados (CORRECT > PRESENT > ABSENT). Implementa `IKeyboardView`.

- `ui/components/ModalManager.ts`: Responsabilidad única sobre el modal de fin de partida. Gestiona `showGameOver`, `hideModal`, y todos los métodos privados de configuración del modal. Implementa `IModalView`.

- `ui/helpers/domHelpers.ts`: Función utilitaria pura `applyStateClass` compartida por `CellManager` y `KeyboardManager`. Evita la duplicación de lógica de manipulación de clases CSS.

- `input/InputManager.ts`: Escucha eventos físicos (keydown) y virtuales (clics en pantalla), los normaliza y los pasa al Controlador.

- `repositories/LocalWordRepository.ts`: Implementa `IWordRepository`. Es la "Base de Datos" actual, devolviendo palabras de un array local.

- `config/uiConfig.ts`: Centraliza todos los selectores CSS, clases y tiempos de animación. Elimina los Magic Strings del código de UI.

---

## 5. App.ts

Es el único archivo del proyecto autorizado para instanciar concretos. Su única función es construir los managers de UI, ensamblar el Parameter Object `IGameViews`, instanciar los casos de uso con sus dependencias, arrancar el juego y ceder el control. No contiene lógica de negocio.

---

## Decisiones Arquitectónicas y Posibles Refactorizaciones (Tech Debt)

Durante el desarrollo, hemos llevado el código al límite del Clean Code. Hemos identificado y debatido las siguientes áreas que podrían evolucionar en futuras iteraciones:

1. **CQRS vs. Interfaces de Casos de Uso Específicos**
   - **Estado Actual:** Tenemos interfaces específicas para cada caso de uso y un aglutinador (`IGameUseCases`). Esto prioriza la legibilidad y el Principio de Segregación de Interfaces (ISP). Las firmas distintas entre casos de uso justifican la segregación.
   - **Posible Refactor (Nivel Enterprise):** Implementar una interfaz genérica `IUseCase<TInput, TOutput>` obligando a que cada caso de uso reciba un único objeto Input/Command (DTO). Facilitaría la creación de Middlewares (logs, métricas) pero añadiría verbosidad al empaquetar variables simples.

2. **UI Facade + ISP por Segregación de Vistas**
   - **Estado Actual:** `UI.ts` actúa como Fachada que implementa cuatro interfaces segregadas (`ICellView`, `IKeyboardView`, `IModalView`, `IResetView`). `GamePresenter` recibe `IGameViews` como Parameter Object y accede solo a la vista que necesita en cada método. ISP aplicado al máximo.
   - **Posible Refactor:** Inyectar los managers directamente en `GamePresenter` eliminando la Fachada `UI`. Añadiría purismo DIP pero rompería el Composition Root actual e introduciría un constructor telegráfico en `GamePresenter`.

3. **Responsabilidad del GameController**
   - **Estado Actual:** El `GameController` incluye una pequeña validación: `if (this._game.gameState !== GameState.PLAYING) return;`.
   - **Posible Refactor:** Desde una visión ultra-ortodoxa de Clean Architecture, esta validación pertenece al Dominio. Añadir un método `isPlaying()` público en `Game` y usarlo en el Controller eliminaría esa fuga de lógica de negocio hacia la capa de presentación.

---

## 🐛 Bugs corregidos respecto al original

| # | Archivo original | Bug | Solución |
|---|-----------------|-----|----------|
| 1 | `Game.ts` | `backspacePressed()` y `newKeyPressed()` duplicados | Unificado en `addLetter()`, `removeLetter()`, `submitWord()` |
| 2 | `Game.ts` | `checkMisplacedLetters` falla con letras repetidas | `WordValidator` con doble pasada (verdes primero, luego naranjas) |
| 3 | `Game.ts` | `backspacePressed()` no actualizaba `_actualWord` | `removeLetter()` actualiza correctamente con `.slice(0, -1)` |
| 4 | `Interfaze.ts` | `changeBackgroundKey` no cambiaba el color de la tecla | `changeKeyState()` en `KeyboardManager.ts` con jerarquía CORRECT > PRESENT |
| 5 | `Words.ts` | Fórmula de número aleatorio confusa | `Math.floor(Math.random() * words.length)` limpio en `LocalWordRepository` |
| 6 | `Game.ts` | Comentarios mezclados e inconsistentes | Eliminados, el código se explica solo |
| 7 | `UI.ts` | `setSecretWord` mostraba la palabra secreta también al ganar | `ModalManager` solo muestra la palabra cuando el estado es `LOST` |
| 8 | `App.ts` | `console.log` exponía la palabra secreta en DevTools | Eliminado |
| 9 | `AddLetterUseCase.ts` / `RemoveLetterUseCase.ts` | Columna calculada post-mutación (acoplamiento temporal) | Estado capturado antes de mutar el dominio |