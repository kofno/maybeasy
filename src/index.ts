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

export { Maybe, Just, just, Nothing, nothing, Nullable, fromNullable };
