import Just, { just } from './Just';
import Maybe from './Maybe';
import Nothing, { nothing } from './Nothing';
declare type Nullable = null | undefined;
declare const fromNullable: <T>(v: T | null | undefined) => Maybe<T>;
export { Maybe, Just, just, Nothing, nothing, Nullable, fromNullable };
