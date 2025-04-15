// src/index.ts

// Re-export Maybe and its related functions
export { just, default as Maybe, maybe, nothing } from './Maybe';

// Re-export functions from functions.ts
export {
  andThen,
  ap,
  cata,
  Emptyable,
  exists,
  filter,
  fromEmpty,
  fromNullable,
  getOrElse,
  getOrElseValue,
  isJust,
  isNothing,
  map,
  Nullable,
  sequence,
  traverse,
} from './functions';

// Re-export Catamorphism type
export type { default as Catamorphism } from './Catamorphism';
