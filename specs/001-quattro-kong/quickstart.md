# Quickstart: Quattro Kong

## Prerequisites

- Node.js and npm available on the local machine.
- Project opened at `D:\Work\SITA\Week3\ai-bootcamp-week-3`.

## Install dependencies

```powershell
npm install
```

## Run the browser game

```powershell
npm run dev
```

Open the local URL printed by Vite. Confirm the game displays the player, platforms,
ladders, hazard, enemy, collectibles, goal, score, lives, and controls.

## Static validation

```powershell
npm run typecheck
```

Expected result: TypeScript completes without errors.

## Automated tests

```powershell
npm test
```

Expected result: validation, movement, boundary, ladder, collision, score, win, and
lose tests pass deterministically.

## Production build

```powershell
npm run build
```

Expected result: Vite produces a browser build without errors.

## Required evaluation scenarios

Record the expected result before implementation and actual results before and after
the controlled change:

1. valid new game starts with the expected lives and score;
2. player cannot leave the level boundary;
3. invalid configuration is rejected or safely replaced;
4. one real baseline defect is reproduced and then rechecked after one controlled
   change.

The final evidence must identify whether each result came from a local test, manual
browser smoke test, or offline fixture.
