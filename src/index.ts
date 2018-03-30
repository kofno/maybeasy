import Just, { just } from './Just';
import Maybe from './Maybe';
import Nothing, { nothing } from './Nothing';

type Nullable = null | undefined;

/**
 * Converts a value that _may_ be null or undefined to a maybe.
 * If the value is null or undefined, then Nothing is returned.
 * If the value is anything else, it is returned wrapped in a Just.
 */
const fromNullable = <T>(v: T | Nullable): Maybe<T> => {
  if (v) {
    return just(v);
  }
  return nothing();
};

/**
 * Returns true if maybe is an instance of Just
 *
 * Example: Remove `Nothing` values from an array
 *
 *     const maybes: Maybe<string>[]
 *     maybes.filter(isJust)
 */
const isJust = (maybe: Maybe<any>): boolean => maybe instanceof Just;

/**
 * Returns true if maybe is an instance of Nothing
 *
 * Example: Count the `Nothing`s
 *
 *     const maybes: Maybe<string>[];
 *     maybes.filter(isNothing).length;
 */
const isNothing = (maybe: Maybe<any>): boolean => maybe instanceof Nothing;

export { Maybe, Just, just, Nothing, nothing, Nullable, fromNullable, isJust, isNothing };
