import { just } from './Just.ts';
import Maybe from './Maybe.ts';
import { nothing } from './Nothing.ts';

export type Nullable = null | undefined;
export type Emptyable = { length: number };

/**
 * Converts a value that _may_ be null or undefined to a maybe.
 * If the value is null or undefined, then Nothing is returned.
 * If the value is anything else, it is returned wrapped in a Just.
 */
export function fromNullable<T>(v: T | Nullable): Maybe<T> {
  if (typeof v === 'undefined' || v === null) {
    return nothing();
  }
  return just(v);
};

/**
 * Converts a value that _may_ be empty, such as a string or an array, to a
 * maybe. It will accept anything that responds to length.
 * If the value is has a length of 0, then Nothing is returned.
 * If the value is anything else, it is returned wrapped in a Just.
 */
export function fromEmpty<T extends Emptyable>(xs: T): Maybe<T> {
  return xs.length === 0 ? nothing<T>() : just(xs);
}

/**
 * Returns true if maybe is an instance of Just
 *
 * Example: Remove `Nothing` values from an array
 *
 *     const maybes: Maybe<string>[]
 *     maybes.filter(isJust)
 */
export function isJust(maybe: Maybe<unknown>): boolean { return maybe.isJust() }

/**
 * Returns true if maybe is an instance of Nothing
 *
 * Example: Count the `Nothing`s
 *
 *     const maybes: Maybe<string>[];
 *     maybes.filter(isNothing).length;
 */
export function isNothing(maybe: Maybe<unknown>): boolean { return maybe.isNothing() }

/**
 * Returns the value of the maybe if it is a Just, otherwise returns the
 * provided default value.
 */
export function getOrElseValue<T>(value: T): (maybe: Maybe<T>) => T;
export function getOrElseValue<T>(value: T, maybe: Maybe<T>): T;
export function getOrElseValue<T>(value: T, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) => maybe.getOrElseValue(value);
  return typeof maybe === 'undefined' ? doit : doit(maybe);
}

/**
 * Returns the value of the maybe if it is a Just, otherwise returns the
 * result of the provided function.
 */
export function getOrElse<T>(fn: () => T, maybe: Maybe<T>): T;
export function getOrElse<T>(fn: () => T): (maybe: Maybe<T>) => T;
export function getOrElse<T>(fn: () => T, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) => maybe.getOrElse(fn);
  return typeof maybe === 'undefined' ? doit : doit(maybe);
}

export * from './Just.ts';
export * from './Maybe.ts';
export * from './Nothing.ts';

