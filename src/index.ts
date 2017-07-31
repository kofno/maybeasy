import Just, { just } from './Just';
import Maybe from './Maybe';
import Nothing, { nothing } from './Nothing';

type Nullable = null | undefined;

const fromNullable = <T>(v: T | Nullable): Maybe<T> => {
  if (v) {
    return just(v);
  }
  return nothing();
};

export { Maybe, Just, just, Nothing, nothing, Nullable, fromNullable };
