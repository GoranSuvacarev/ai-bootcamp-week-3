# Data Model: Quattro Kong

## Core scalar types

```ts
type GamePhase = "ready" | "playing" | "won" | "lost";
type Difficulty = "easy" | "normal";

type Point = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type Rect = Point & Size;
```

All numeric values that enter the game core must be finite. Dimensions, lives, and
score must not be negative.

## GameConfig

```ts
type GameConfig = {
  levelWidth: number;
  levelHeight: number;
  lives: number;
  playerSpeed: number;
  jumpVelocity: number;
  gravity: number;
  difficulty: Difficulty;
};
```

Runtime validation must check required fields, finite numeric values, positive level
dimensions, non-negative lives, positive movement values, and the allowed difficulty
enum. Invalid input returns a typed validation failure or a documented safe default;
it must not produce an uncaught exception.

## Level entities

```ts
type Platform = Rect;

type Ladder = Rect & {
  fromPlatformId: string;
  toPlatformId: string;
};

type RollingHazard = Rect & {
  id: string;
  velocityX: number;
  active: boolean;
};

type PatrolEnemy = Rect & {
  id: string;
  velocityX: number;
  patrolMinX: number;
  patrolMaxX: number;
};

type Collectible = Rect & {
  id: string;
  points: number;
  collected: boolean;
};

type Goal = Rect;
```

## Player and game state

```ts
type PlayerState = Rect & {
  velocityX: number;
  velocityY: number;
  onGround: boolean;
  onLadder: boolean;
  invulnerableUntil: number;
};

type GameState = {
  config: GameConfig;
  phase: GamePhase;
  time: number;
  score: number;
  lives: number;
  player: PlayerState;
  platforms: Platform[];
  ladders: Ladder[];
  hazards: RollingHazard[];
  enemy: PatrolEnemy;
  collectibles: Collectible[];
  goal: Goal;
};
```

## Input contract

```ts
type GameInput = {
  left: boolean;
  right: boolean;
  jump: boolean;
  climbUp: boolean;
  climbDown: boolean;
};
```

The browser adapter maps keyboard events to this input shape. The game rules do not
read keyboard events directly.

## State transition rules

- `ready -> playing` occurs when a new game starts.
- `playing -> playing` handles movement, collisions, score, and time.
- `playing -> won` occurs when the player reaches the goal, unless a higher-priority
  damage event is resolved in the same update.
- `playing -> lost` occurs when damage reduces lives to zero.
- `won` and `lost` ignore normal movement until a new game is started.
- A damage event consumes at most one life while the player is invulnerable.
- A collectible changes from uncollected to collected once only.
