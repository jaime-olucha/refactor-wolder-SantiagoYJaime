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
│   │
│   ├── 📁 infrastructure/       <-- 🔵 INFRASTRUCTURA (DOM, DBs...)
│   │   ├── 📁 config/
│   │   ├── 📁 input/
│   │   ├── 📁 repositories/
│   │   └── 📁 ui/
│   │
│   └── 📁 shared/               <-- ⚪ SHARED (código transversal)
│       ├── 📄 gameConfig.ts
│       └── 📄 utils.ts
└── package.json
```

---

##  1. Capa de Dominio

Es el corazón de la aplicación. No importa (import) absolutamente nada de otras capas. Aquí residen las reglas matemáticas e inmutables del juego.

- `entities/Game.ts`: La Entidad principal. Gestiona su propio estado interno (intentos, palabra actual, si se ha ganado o perdido) mediante encapsulamiento estricto y métodos defensivos. Excluye cualquier lógica externa.

- `services/WordValidator.ts`: Contiene el algoritmo core del juego. Compara el intento del usuario con la palabra secreta manejando casos complejos (como letras repetidas) devolviendo un array de estados (CORRECT, PRESENT, ABSENT).

- `repositories/IWordRepository.ts` & `services/IWordValidator.ts`: Interfaces puras (Puertos). Definen los contratos que el dominio necesita para sobrevivir, sin importarle quién los implemente.

- `types/typesState.ts`: Enums que definen los estados posibles de las letras y del propio juego.

---

##  2. Capa de Aplicación

Contiene los "Casos de Uso", los trabajadores que orquestan el flujo de información utilizando las piezas del Dominio.

- `useCases/AddLetterUseCase.ts`, `RemoveLetterUseCase.ts`, `SubmitWordUseCase.ts`, `ResetGameUseCase.ts`: Cada archivo tiene una única responsabilidad (SRP). Reciben el juego, ejecutan la acción permitida en el dominio y avisan al Presentador del resultado.

- `ports/IGameUseCases.ts`: Actúa como un Input Boundary o Fachada. Agrupa todos los casos de uso para evitar inyectar múltiples dependencias en el Controlador.

- `ports/IGamePresenter.ts`: El Output Port. El contrato que obliga a la siguiente capa a saber cómo comunicar los cambios visuales.

---

##  3. Capa de Presentación

Son los traductores. Transforman los estímulos externos en formato que la Aplicación entienda, y viceversa.

- `GameController.ts`: Implementa IInputHandler. Recibe teclas normalizadas (del InputManager) y decide qué Caso de Uso debe ejecutarse (ENTER, BACKSPACE o letra).

- `GamePresenter.ts`: Implementa IGamePresenter. Recibe datos crudos de los Casos de Uso (ej: fila 1, columna 2, estado CORRECT) y ordena a la Vista (`IGameView`) cómo y dónde pintarlo.

- `ports/IGameView.ts` & `IInputHandler.ts`: Contratos que separan a los traductores de la tecnología real de infraestructura.

---

##  4. Capa de Infraestructura

Aquí es donde el código se ensucia las manos con la tecnología específica (El DOM del navegador). Es la capa más volátil y fácil de reemplazar.

- `ui/UI.ts`: Implementa `IGameView`. Es un Director de Orquesta (Patrón Fachada). 

- `input/InputManager.ts`: Escucha eventos físicos (keydown) y virtuales (clics en pantalla), los normaliza y los pasa al Controlador.

- `repositories/LocalWordRepository.ts`: Implementa `IWordRepository`. Es la "Base de Datos" actual, devolviendo palabras de un array local.

- `config/uiConfig.ts`: Centraliza todos los selectores CSS, clases y tiempos de animación. Elimina los Magic Strings del código de UI.

--- 

## 5. App.ts

Es el único archivo del proyecto autorizado para romper el principio de Inversión de Dependencias (DIP). Su única función es instanciar las implementaciones concretas de la Infraestructura, inyectarlas en los Casos de Uso y Controladores, arrancar el juego y ceder el control.

---

## Decisiones Arquitectónicas y Posibles Refactorizaciones (Tech Debt)

Durante el desarrollo, hemos llevado el código al límite del Clean Code. Hemos identificado y debatido las siguientes áreas que podrían evolucionar en futuras iteraciones para alcanzar un purismo aún más extremo:

1. **CQRS vs. Interfaces de Casos de Uso Específicos**
- Estado Actual: Tenemos interfaces específicas para cada caso de uso y un aglutinador (`IGameUseCases`). Esto prioriza la legibilidad y el Principio de Segregación de Interfaces (ISP).

- Posible Refactor (Nivel Enterprise): Implementar una interfaz genérica `IUseCase<TRequest, TResponse>` obligando a que cada caso de uso reciba un único objeto `Input/Command` (DTO). Esto facilitaría la creación de Middlewares (para logs o métricas de rendimiento) pero añadiría verbosidad al empaquetar variables simples.

2. **UI Facade vs. Componentes Desacoplados**
- Estado Actual: `UI.ts` actúa como una fachada que implementa `IGameView`.

- Posible Refactor: La interfaz `IGameView` podría dividirse usando el Principio de Segregación de Interfaces (ISP) mediante herencia de capacidades (`export interface IGameView extends ICanDrawGrid, ICanShowAlerts...`). Esto blindaría aún más al Presentador, aunque para un proyecto de alcance front-end puro, la fachada actual mantiene el equilibrio perfecto entre purismo y pragmatismo (evitando el Delegation Tax excesivo).

3. **Responsabilidad del GameController**
- Estado Actual: El `GameController` incluye una pequeña validación: `if (this._game.gameState !== GameState.PLAYING) return;`.

- Posible Refactor: Desde una visión ultra-ortodoxa de la Clean Architecture, el Controlador debería ser completamente "tonto" y limitarse a rutear. Esta validación pertenece estrictamente a las reglas de negocio (Dominio/Casos de Uso). Moverla eliminaría esa fuga de lógica, aunque actualmente sirve como un parche defensivo eficiente en la capa de UI.


## 🐛 Bugs corregidos respecto al original

| # | Archivo original | Bug | Solución |
|---|-----------------|-----|----------|
| 1 | `Game.ts` | `backspacePressed()` y `newKeyPressed()` duplicados | Unificado en `addLetter()`, `removeLetter()`, `submitWord()` |
| 2 | `Game.ts` | `checkMisplacedLetters` falla con letras repetidas | `WordValidator` con doble pasada (verdes primero, luego naranjas) |
| 3 | `Game.ts` | `backspacePressed()` no actualizaba `_actualWord` | `removeLetter()` actualiza correctamente con `.slice(0, -1)` |
| 4 | `Interfaze.ts` | `changeBackgroundKey` no cambiaba el color de la tecla | `changeKeyState()` en `UI.ts` con jerarquía CORRECT > PRESENT |
| 5 | `Words.ts` | Fórmula de número aleatorio confusa | `Math.floor(Math.random() * words.length)` limpio en `WordProvider` |
| 6 | `Game.ts` | Comentarios mezclados e inconsistentes | Eliminados, el código se explica solo |
