// src/index.ts

// Re-export Maybe and its related functions
export { default as Maybe, just, nothing, maybe } from "./Maybe";

// Re-export functions from functions.ts
export {
  fromNullable,
  fromEmpty,
  isJust,
  isNothing,
  map,
  andThen,
  getOrElseValue,
  getOrElse,
  cata,
} from "./functions";

// Re-export Catamorphism type
export type { default as Catamorphism } from "./Catamorphism";
