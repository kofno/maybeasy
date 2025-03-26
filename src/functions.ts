import Catamorphism from "./Catamorphism";
import Maybe, { just, nothing } from "./Maybe";

export type Nullable = null | undefined;
export type Emptyable = { length: number };

/**
 * Converts a potentially nullable value (`undefined` or `null`) into a `Maybe` type.
 * If the value is `undefined` or `null`, it returns `nothing()`.
 * Otherwise, it wraps the value in a `just()` and returns it.
 *
 * @template T - The type of the value to be wrapped in a `Maybe`.
 * @param v - The value to be converted into a `Maybe`. Can be of type `T` or nullable (`undefined` or `null`).
 * @returns A `Maybe<T>` representing the value. Returns `nothing()` if the value is `undefined` or `null`, otherwise `just(v)`.
 */
export function fromNullable<T>(v: T | Nullable): Maybe<T> {
  if (typeof v === "undefined" || v === null) {
    return nothing();
  }
  return just(v);
}

/**
 * Converts an emptyable value into a `Maybe` type.
 *
 * If the input value is empty (i.e., its `length` property is `0`), the function
 * returns `nothing<T>()`. Otherwise, it wraps the value in a `just` and returns it.
 *
 * @template T - The type of the input value, which must extend `Emptyable`.
 * @param xs - The input value to be converted into a `Maybe`. It must have a `length` property.
 * @returns A `Maybe` type wrapping the input value. Returns `nothing<T>()` if the input is empty,
 *          otherwise returns `just(xs)`.
 */
export function fromEmpty<T extends Emptyable>(xs: T): Maybe<T> {
  return xs.length === 0 ? nothing<T>() : just(xs);
}

/**
 * Determines if a given `Maybe` value is in the "Just" state.
 *
 * This type guard function checks whether the provided `Maybe` instance
 * contains a value (`isJust` state) and narrows the type accordingly.
 *
 * @template T - The type of the value contained in the `Maybe`.
 * @param maybe - The `Maybe` instance to check.
 * @returns A boolean indicating whether the `Maybe` is in the "Just" state.
 */
export function isJust<T>(maybe: Maybe<T>): maybe is Maybe<T> & { state: T } {
  return maybe.isJust();
}

/**
 * Determines if a given `Maybe` instance represents a "nothing" state.
 *
 * @template T - The type of the value that the `Maybe` instance may contain.
 * @param maybe - The `Maybe` instance to check.
 * @returns A type guard indicating whether the `Maybe` instance is in the "nothing" state.
 */
export function isNothing<T>(
  maybe: Maybe<T>
): maybe is Maybe<T> & { state: null } {
  return maybe.isNothing();
}

/**
 * Applies a function to the value inside a `Maybe` if it's a `Just`, otherwise returns `Nothing`.
 *
 * This function is used to transform the value contained within a `Maybe` instance. If the `Maybe`
 * is `Just`, the provided function `fn` is applied to the value, and the result is wrapped in a new
 * `Just`. If the `Maybe` is `Nothing`, it returns `Nothing` without applying the function.
 *
 * This function is curried, meaning it can be called with either one or two arguments.
 *
 * @template T - The type of the value contained within the input `Maybe`.
 * @template U - The type of the value contained within the output `Maybe` after applying the function.
 * @param fn - The function to apply to the value inside the `Maybe`. It takes a value of type `T` and returns a value of type `U`.
 * @param maybe - (Optional) The `Maybe` instance to apply the function to. If omitted, the function returns a curried function expecting a `Maybe`.
 * @returns If `maybe` is provided, returns a new `Maybe<U>` with the result of applying `fn` to the value (if it's a `Just`) or `Nothing` (if it's `Nothing`).
 *          If `maybe` is not provided, returns a curried function that takes a `Maybe<T>` and returns a `Maybe<U>`.
 *
 * @example
 * // Using map with both arguments
 * const maybeNumber: Maybe<number> = just(5);
 * const maybeString: Maybe<string> = map((x) => x.toString(), maybeNumber); // maybeString is just("5")
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const nothingString: Maybe<string> = map((x) => x.toString(), nothingMaybe); // nothingString is nothing()
 *
 * @example
 * // Using map in its curried form
 * const toString = map((x: number) => x.toString());
 * const maybeNumber: Maybe<number> = just(10);
 * const maybeString: Maybe<string> = toString(maybeNumber); // maybeString is just("10")
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const nothingString: Maybe<string> = toString(nothingMaybe); // nothingString is nothing()
 */
export function map<T, U>(fn: (x: T) => U, maybe: Maybe<T>): Maybe<U>;
export function map<T, U>(fn: (x: T) => U): (maybe: Maybe<T>) => Maybe<U>;
export function map<T, U>(fn: (x: T) => U, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) => maybe.map(fn);
  return typeof maybe === "undefined" ? doit : doit(maybe);
}

/**
 * Applies a function that returns a `Maybe` to the value inside another `Maybe` if it's a `Just`, otherwise returns `Nothing`.
 *
 * This function is used for chaining `Maybe` computations together. If the input `Maybe` is `Just`, the provided function `fn` is
 * applied to the value, and the resulting `Maybe` is returned. If the input `Maybe` is `Nothing`, it returns `Nothing` without
 * applying the function. This is often referred to as "monadic chaining" or "flatMap" in other contexts.
 *
 * This function is curried, meaning it can be called with either one or two arguments.
 *
 * @template T - The type of the value contained within the input `Maybe`.
 * @template U - The type of the value contained within the output `Maybe` after applying the function.
 * @param fn - The function to apply to the value inside the `Maybe`. It takes a value of type `T` and returns a `Maybe<U>`.
 * @param maybe - (Optional) The `Maybe` instance to apply the function to. If omitted, the function returns a curried function expecting a `Maybe`.
 * @returns If `maybe` is provided, returns the `Maybe<U>` resulting from applying `fn` to the value (if it's a `Just`) or `Nothing` (if it's `Nothing`).
 *          If `maybe` is not provided, returns a curried function that takes a `Maybe<T>` and returns a `Maybe<U>`.
 *
 * @example
 * // Using andThen with both arguments
 * const maybeNumber: Maybe<number> = just(5);
 * const maybeString: Maybe<string> = andThen((x) => just(x.toString()), maybeNumber); // maybeString is just("5")
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const nothingString: Maybe<string> = andThen((x) => just(x.toString()), nothingMaybe); // nothingString is nothing()
 *
 * const maybeNumber2: Maybe<number> = just(5);
 * const nothingString2: Maybe<string> = andThen((x) => nothing<string>(), maybeNumber2); // nothingString2 is nothing()
 *
 * @example
 * // Using andThen in its curried form
 * const toStringMaybe = andThen((x: number) => just(x.toString()));
 * const maybeNumber: Maybe<number> = just(10);
 * const maybeString: Maybe<string> = toStringMaybe(maybeNumber); // maybeString is just("10")
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const nothingString: Maybe<string> = toStringMaybe(nothingMaybe); // nothingString is nothing()
 *
 * const maybeNumber2: Maybe<number> = just(5);
 * const nothingString3: Maybe<string> = toStringMaybe((x) => nothing<string>()); // nothingString3 is nothing()
 */
export function andThen<T, U>(
  fn: (x: T) => Maybe<U>,
  maybe: Maybe<T>
): Maybe<U>;
/**
 * Applies the function to the value of the maybe if it is a Just, otherwise returns the Nothing
 * This is a curried function that allows you to chain together a series of operations using pipe or compose.
 * @param fn a function that returns a maybe
 * @returns a function that takes a maybe and returns a new maybe with the result of the function applied to the value
 */
export function andThen<T, U>(
  fn: (x: T) => Maybe<U>
): (maybe: Maybe<T>) => Maybe<U>;
export function andThen<T, U>(fn: (x: T) => Maybe<U>, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) => maybe.andThen(fn);
  return typeof maybe === "undefined" ? doit : doit(maybe);
}

/**
 * Returns the value contained within a `Maybe` if it's a `Just`, otherwise returns a default value.
 *
 * This function is used to extract the value from a `Maybe` instance, providing a fallback
 * value in case the `Maybe` is `Nothing`. If the `Maybe` is `Just`, the contained value is
 * returned. If the `Maybe` is `Nothing`, the provided `value` is returned instead.
 *
 * This function is curried, meaning it can be called with either one or two arguments.
 *
 * @template T - The type of the value contained within the `Maybe`.
 * @param value - The default value to return if the `Maybe` is `Nothing`.
 * @param maybe - (Optional) The `Maybe` instance to extract the value from. If omitted, the function returns a curried function expecting a `Maybe`.
 * @returns If `maybe` is provided, returns the value contained within the `Maybe` (if it's a `Just`) or the `value` (if it's `Nothing`).
 *          If `maybe` is not provided, returns a curried function that takes a `Maybe<T>` and returns a `T`.
 *
 * @example
 * // Using getOrElseValue with both arguments
 * const maybeNumber: Maybe<number> = just(5);
 * const number: number = getOrElseValue(10, maybeNumber); // number is 5
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const defaultNumber: number = getOrElseValue(10, nothingMaybe); // defaultNumber is 10
 *
 * @example
 * // Using getOrElseValue in its curried form
 * const defaultValue = getOrElseValue(10);
 * const maybeNumber: Maybe<number> = just(5);
 * const number: number = defaultValue(maybeNumber); // number is 5
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const defaultNumber: number = defaultValue(nothingMaybe); // defaultNumber is 10
 */
export function getOrElseValue<T>(value: T): (maybe: Maybe<T>) => T;
export function getOrElseValue<T>(value: T, maybe: Maybe<T>): T;
export function getOrElseValue<T>(value: T, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) => maybe.getOrElseValue(value);
  return typeof maybe === "undefined" ? doit : doit(maybe);
}

/**
 * Returns the value contained within a `Maybe` if it's a `Just`, otherwise returns the result of evaluating a function.
 *
 * This function is used to extract the value from a `Maybe` instance, providing a fallback
 * mechanism in case the `Maybe` is `Nothing`. If the `Maybe` is `Just`, the contained value is
 * returned. If the `Maybe` is `Nothing`, the provided function `fn` is evaluated, and its result is returned.
 *
 * This function is curried, meaning it can be called with either one or two arguments.
 *
 * @template T - The type of the value contained within the `Maybe`.
 * @param fn - The function to evaluate and return if the `Maybe` is `Nothing`. It should return a value of type `T`.
 * @param maybe - (Optional) The `Maybe` instance to extract the value from. If omitted, the function returns a curried function expecting a `Maybe`.
 * @returns If `maybe` is provided, returns the value contained within the `Maybe` (if it's a `Just`) or the result of `fn()` (if it's `Nothing`).
 *          If `maybe` is not provided, returns a curried function that takes a `Maybe<T>` and returns a `T`.
 *
 * @example
 * // Using getOrElse with both arguments
 * const maybeNumber: Maybe<number> = just(5);
 * const number: number = getOrElse(() => 10, maybeNumber); // number is 5
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const defaultNumber: number = getOrElse(() => 10, nothingMaybe); // defaultNumber is 10
 *
 * @example
 * // Using getOrElse in its curried form
 * const defaultToTen = getOrElse(() => 10);
 * const maybeNumber: Maybe<number> = just(5);
 * const number: number = defaultToTen(maybeNumber); // number is 5
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const defaultNumber: number = defaultToTen(nothingMaybe); // defaultNumber is 10
 *
 * @example
 * // Using getOrElse with a function that performs a calculation
 * const maybeNumber: Maybe<number> = nothing();
 * const calculatedNumber: number = getOrElse(() => {
 *   const someValue = 2;
 *   return someValue * 5;
 * }, maybeNumber); // calculatedNumber is 10
 */
export function getOrElse<T>(fn: () => T, maybe: Maybe<T>): T;
export function getOrElse<T>(fn: () => T): (maybe: Maybe<T>) => T;
export function getOrElse<T>(fn: () => T, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) => maybe.getOrElse(fn);
  return typeof maybe === "undefined" ? doit : doit(maybe);
}

/**
 * Performs pattern matching on a `Maybe` instance, executing different functions based on whether it's a `Just` or `Nothing`.
 *
 * This function allows you to handle both the `Just` and `Nothing` cases of a `Maybe` in a structured way.
 * It takes a `Catamorphism` object, which defines how to handle each case, and a `Maybe` instance.
 * If the `Maybe` is `Just`, the `Just` function from the `Catamorphism` is called with the contained value.
 * If the `Maybe` is `Nothing`, the `Nothing` function from the `Catamorphism` is called.
 *
 * This function is curried, meaning it can be called with either one or two arguments.
 *
 * @template T - The type of the value contained within the `Maybe`.
 * @template U - The type of the result produced by the `Catamorphism` functions.
 * @param matcher - A `Catamorphism` object containing `Just` and `Nothing` functions.
 * @param maybe - (Optional) The `Maybe` instance to perform pattern matching on. If omitted, the function returns a curried function expecting a `Maybe`.
 * @returns If `maybe` is provided, returns the result of applying the appropriate function from `matcher` to the `Maybe`.
 *          If `maybe` is not provided, returns a curried function that takes a `Maybe<T>` and returns a `U`.
 *
 * @example
 * // Using cata with both arguments
 * const maybeNumber: Maybe<number> = just(5);
 * const result: string = cata(
 *   {
 *     Just: (x) => `The value is ${x}`,
 *     Nothing: () => "There is no value",
 *   },
 *   maybeNumber
 * ); // result is "The value is 5"
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const nothingResult: string = cata(
 *   {
 *     Just: (x) => `The value is ${x}`,
 *     Nothing: () => "There is no value",
 *   },
 *   nothingMaybe
 * ); // nothingResult is "There is no value"
 *
 * @example
 * // Using cata in its curried form
 * const describeMaybe = cata({
 *   Just: (x: number) => `The value is ${x}`,
 *   Nothing: () => "There is no value",
 * });
 * const maybeNumber: Maybe<number> = just(10);
 * const result: string = describeMaybe(maybeNumber); // result is "The value is 10"
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const nothingResult: string = describeMaybe(nothingMaybe); // nothingResult is "There is no value"
 */
export function cata<T, U>(matcher: Catamorphism<T, U>, maybe: Maybe<T>): U;
export function cata<T, U>(matcher: Catamorphism<T, U>): (maybe: Maybe<T>) => U;
export function cata<T, U>(matcher: Catamorphism<T, U>, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) => maybe.cata(matcher);
  return typeof maybe === "undefined" ? doit : doit(maybe);
}

/**
 * Takes an array of `Maybe<T>` and returns a `Maybe<T[]>`. If all the `Maybe` values in the array are `Just`,
 * it returns a `Just` containing an array of the unwrapped values. If any are `Nothing`, it returns `Nothing`.
 *
 * @template T - The type of the value contained within the `Maybe` instances in the array.
 * @param maybes - An array of `Maybe<T>` instances.
 * @returns A `Maybe<T[]>` containing an array of the unwrapped values if all were `Just`, or `Nothing` if any were `Nothing`.
 *
 * @example
 * const maybes: Maybe<number>[] = [just(1), just(2), just(3)];
 * const result: Maybe<number[]> = sequence(maybes); // result is just([1, 2, 3])
 *
 * const maybes2: Maybe<number>[] = [just(1), nothing(), just(3)];
 * const result2: Maybe<number[]> = sequence(maybes2); // result2 is nothing()
 */
export function sequence<T>(maybes: Maybe<T>[]): Maybe<T[]> {
  const result: T[] = [];
  for (const maybe of maybes) {
    if (maybe.state === null) {
      return nothing();
    }
    result.push(maybe.state);
  }
  return just(result);
}

/**
 * Applies a function to each element of an array, producing a `Maybe` for each element,
 * and then combines the results into a single `Maybe` containing an array of the unwrapped values.
 *
 * This function is similar to `sequence`, but it takes an array of values and a function that maps
 * each value to a `Maybe`. It then returns a `Maybe` containing an array of the unwrapped values
 * (if all were `Just`) or `Nothing` (if any were `Nothing`).
 *
 * This function is curried, meaning it can be called with either one or two arguments.
 *
 * @template T - The type of the values in the input array.
 * @template U - The type of the value contained within the `Maybe` instances returned by the mapping function.
 * @param fn - The function to apply to each value in the array. It takes a value of type `T` and returns a `Maybe<U>`.
 * @param values - (Optional) The array of values to traverse. If omitted, the function returns a curried function expecting an array of `T`.
 * @returns If `values` is provided, returns a `Maybe<U[]>` containing an array of the unwrapped values if all were `Just`, or `Nothing` if any were `Nothing`.
 *          If `values` is not provided, returns a curried function that takes an array of `T` and returns a `Maybe<U[]>`.
 *
 * @example
 * // Using traverse with both arguments
 * const numbers: number[] = [1, 2, 3];
 * const result: Maybe<string[]> = traverse((n) => just(n.toString()), numbers); // result is just(["1", "2", "3"])
 *
 * const numbers2: number[] = [1, 2, 3];
 * const result2: Maybe<string[]> = traverse((n) => n % 2 === 0 ? just(n.toString()) : nothing(), numbers2); // result2 is nothing()
 *
 * @example
 * // Using traverse in its curried form
 * const toStringMaybe = traverse((n: number) => just(n.toString()));
 * const numbers: number[] = [1, 2, 3];
 * const result: Maybe<string[]> = toStringMaybe(numbers); // result is just(["1", "2", "3"])
 *
 * const numbers2: number[] = [1, 2, 3];
 * const result2: Maybe<string[]> = toStringMaybe((n) => n % 2 === 0 ? just(n.toString()) : nothing())(numbers2); // result2 is nothing()
 */
export function traverse<T, U>(
  fn: (value: T) => Maybe<U>
): (values: T[]) => Maybe<U[]>;
export function traverse<T, U>(
  fn: (value: T) => Maybe<U>,
  values: T[]
): Maybe<U[]>;
export function traverse<T, U>(fn: (value: T) => Maybe<U>, values?: T[]) {
  const doit = (values: T[]) => sequence(values.map(fn));
  return typeof values === "undefined" ? doit : doit(values);
}

/**
 * Returns `Nothing` if the predicate function returns `false` for the `Just` value, otherwise returns the original `Maybe`.
 *
 * This function is used for conditional validation of the value contained within a `Maybe`.
 * If the `Maybe` is `Just`, the provided predicate function `fn` is applied to the value.
 * If `fn` returns `true`, the original `Maybe` is returned. If `fn` returns `false`, `Nothing` is returned.
 * If the `Maybe` is `Nothing`, it returns `Nothing` without applying the function.
 *
 * This function is curried, meaning it can be called with either one or two arguments.
 *
 * @template T - The type of the value contained within the `Maybe`.
 * @param fn - The predicate function to apply to the value inside the `Maybe`. It takes a value of type `T` and returns a boolean.
 * @param maybe - (Optional) The `Maybe` instance to apply the filter to. If omitted, the function returns a curried function expecting a `Maybe`.
 * @returns If `maybe` is provided, returns the original `Maybe` if it's a `Just` and `fn` returns `true`, or `Nothing` otherwise.
 *          If `maybe` is not provided, returns a curried function that takes a `Maybe<T>` and returns a `Maybe<T>`.
 *
 * @example
 * // Using filter with both arguments
 * const maybeNumber: Maybe<number> = just(5);
 * const filteredMaybe: Maybe<number> = filter((x) => x > 3, maybeNumber); // filteredMaybe is just(5)
 *
 * const filteredMaybe2: Maybe<number> = filter((x) => x > 10, maybeNumber); // filteredMaybe2 is nothing()
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const filteredNothing: Maybe<number> = filter((x) => x > 3, nothingMaybe); // filteredNothing is nothing()
 *
 * @example
 * // Using filter in its curried form
 * const isGreaterThanThree = filter((x: number) => x > 3);
 * const maybeNumber: Maybe<number> = just(5);
 * const filteredMaybe: Maybe<number> = isGreaterThanThree(maybeNumber); // filteredMaybe is just(5)
 *
 * const filteredMaybe2: Maybe<number> = isGreaterThanThree(just(2)); // filteredMaybe2 is nothing()
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const filteredNothing: Maybe<number> = isGreaterThanThree(nothingMaybe); // filteredNothing is nothing()
 */
export function filter<T>(fn: (value: T) => boolean, maybe: Maybe<T>): Maybe<T>;
export function filter<T>(
  fn: (value: T) => boolean
): (maybe: Maybe<T>) => Maybe<T>;
export function filter<T>(fn: (value: T) => boolean, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) =>
    maybe.andThen((x) => (fn(x) ? just(x) : nothing()));
  return typeof maybe === "undefined" ? doit : doit(maybe);
}

/**
 * Returns `true` if the `Maybe` is `Just` and the predicate function returns `true` for the contained value, otherwise returns `false`.
 *
 * This function is used to check if a value within a `Maybe` meets a certain condition without unwrapping it.
 * If the `Maybe` is `Just`, the provided predicate function `fn` is applied to the value.
 * If `fn` returns `true`, `true` is returned. If `fn` returns `false`, `false` is returned.
 * If the `Maybe` is `Nothing`, `false` is returned without applying the function.
 *
 * This function is curried, meaning it can be called with either one or two arguments.
 *
 * @template T - The type of the value contained within the `Maybe`.
 * @param fn - The predicate function to apply to the value inside the `Maybe`. It takes a value of type `T` and returns a boolean.
 * @param maybe - (Optional) The `Maybe` instance to check. If omitted, the function returns a curried function expecting a `Maybe`.
 * @returns If `maybe` is provided, returns `true` if the `Maybe` is `Just` and `fn` returns `true`, `false` otherwise.
 *          If `maybe` is not provided, returns a curried function that takes a `Maybe<T>` and returns a `boolean`.
 *
 * @example
 * // Using exists with both arguments
 * const maybeNumber: Maybe<number> = just(5);
 * const exists: boolean = exists((x) => x > 3, maybeNumber); // exists is true
 *
 * const exists2: boolean = exists((x) => x > 10, maybeNumber); // exists2 is false
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const exists3: boolean = exists((x) => x > 3, nothingMaybe); // exists3 is false
 *
 * @example
 * // Using exists in its curried form
 * const isGreaterThanThree = exists((x: number) => x > 3);
 * const maybeNumber: Maybe<number> = just(5);
 * const exists: boolean = isGreaterThanThree(maybeNumber); // exists is true
 *
 * const exists2: boolean = isGreaterThanThree(just(2)); // exists2 is false
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const exists3: boolean = isGreaterThanThree(nothingMaybe); // exists3 is false
 */
export function exists<T>(fn: (value: T) => boolean, maybe: Maybe<T>): boolean;
export function exists<T>(
  fn: (value: T) => boolean
): (maybe: Maybe<T>) => boolean;
export function exists<T>(fn: (value: T) => boolean, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) => (maybe.isJust() ? fn(maybe.state) : false);
  return typeof maybe === "undefined" ? doit : doit(maybe);
}

/**
 * Applies a `Maybe` containing a function to a `Maybe` containing a value.
 *
 * If both `Maybe` instances are `Just`, the function inside the first `Maybe` is applied to the value inside the second `Maybe`,
 * and the result is wrapped in a new `Just`. If either `Maybe` is `Nothing`, `Nothing` is returned.
 *
 * This function is curried, meaning it can be called with either one or two arguments.
 *
 * @template T - The type of the value contained within the input `Maybe`.
 * @template U - The type of the value contained within the output `Maybe` after applying the function.
 * @param maybeFn - (Optional) A `Maybe` instance containing a function that takes a value of type `T` and returns a value of type `U`.
 * @param maybe - (Optional) The `Maybe` instance containing the value to apply the function to. If omitted, the function returns a curried function expecting a `Maybe`.
 * @returns If `maybe` is provided, returns a new `Maybe<U>` with the result of applying the function (if both are `Just`) or `Nothing` (if either is `Nothing`).
 *          If `maybe` is not provided, returns a curried function that takes a `Maybe<T>` and returns a `Maybe<U>`.
 *
 * @example
 * // Using ap with both arguments
 * const maybeAdd: Maybe<(x: number) => number> = just((x: number) => x + 1);
 * const maybeNumber: Maybe<number> = just(5);
 * const result: Maybe<number> = ap(maybeAdd, maybeNumber); // result is just(6)
 *
 * const nothingMaybe: Maybe<(x: number) => number> = nothing();
 * const result2: Maybe<number> = ap(nothingMaybe, maybeNumber); // result2 is nothing()
 *
 * const nothingMaybe2: Maybe<number> = nothing();
 * const result3: Maybe<number> = ap(maybeAdd, nothingMaybe2); // result3 is nothing()
 *
 * @example
 * // Using ap in its curried form
 * const addOne = ap(just((x: number) => x + 1));
 * const maybeNumber: Maybe<number> = just(5);
 * const result: Maybe<number> = addOne(maybeNumber); // result is just(6)
 *
 * const nothingMaybe: Maybe<number> = nothing();
 * const result2: Maybe<number> = addOne(nothingMaybe); // result2 is nothing()
 *
 * const nothingMaybe2: Maybe<(x: number) => number> = nothing();
 * const result3: Maybe<number> = ap(nothingMaybe2)(maybeNumber); // result3 is nothing()
 */
export function ap<T, U>(
  maybeFn: Maybe<(x: T) => U>,
  maybe: Maybe<T>
): Maybe<U>;
export function ap<T, U>(
  maybeFn: Maybe<(x: T) => U>
): (maybe: Maybe<T>) => Maybe<U>;
export function ap<T, U>(maybeFn: Maybe<(x: T) => U>, maybe?: Maybe<T>) {
  const doit = (maybe: Maybe<T>) => maybe.ap(maybeFn);
  return typeof maybe === "undefined" ? doit : doit(maybe);
}
