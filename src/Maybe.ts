import Catamorphism from "./Catamorphism";

/**
 * Creates a `Maybe` instance with the given value.
 *
 * This function is a convenience for creating a `Maybe` that may or may not contain a value.
 * If the value is `null`, it will create a `Nothing` instance. Otherwise, it will create a `Just` instance.
 *
 * @template A - The type of the value that may be present.
 * @param value - The value to be wrapped in the `Maybe`. If `null`, the `Maybe` will be in the `Nothing` state.
 * @returns A `Maybe<A>` instance.
 *
 * @example
 * const maybeNumber: Maybe<number> = maybe(5); // maybeNumber is just(5)
 * const nothingMaybe: Maybe<number> = maybe(null); // nothingMaybe is nothing()
 */
export function maybe<A>(value: A | null): Maybe<A> {
  return new Maybe(value);
}

/**
 * Creates a `Maybe` instance in the `Just` state with the given value.
 *
 * This function is used to create a `Maybe` that explicitly contains a value.
 * It guarantees that the `Maybe` will be in the `Just` state.
 *
 * @template A - The type of the value to be wrapped in the `Maybe`.
 * @param value - The value to be wrapped in the `Maybe`.
 * @returns A `Maybe<A>` instance in the `Just` state.
 *
 * @example
 * const maybeNumber: Maybe<number> = just(5); // maybeNumber is just(5)
 * const maybeString: Maybe<string> = just("hello"); // maybeString is just("hello")
 */
export function just<A>(value: A): Maybe<A> {
  return new Maybe(value);
}

/**
 * Creates a `Maybe` instance in the `Nothing` state.
 *
 * This function is used to create a `Maybe` that explicitly represents the absence of a value.
 * It guarantees that the `Maybe` will be in the `Nothing` state.
 *
 * @template A - The type of the value that would have been present if the `Maybe` were in the `Just` state.
 * @returns A `Maybe<A>` instance in the `Nothing` state.
 *
 * @example
 * const nothingMaybe: Maybe<number> = nothing(); // nothingMaybe is nothing()
 * const nothingString: Maybe<string> = nothing(); // nothingString is nothing()
 */
export function nothing<A>(): Maybe<A> {
  return new Maybe<A>(null);
}

/**
 * Represents a value that may or may not be present.
 *
 * The `Maybe` type is used to handle optional values in a type-safe way. It can be in one of two states:
 * - `Just`: Represents the presence of a value.
 * - `Nothing`: Represents the absence of a value.
 *
 * This class provides methods for working with optional values, such as mapping, chaining, and providing default values.
 *
 * @template A - The type of the value that may be present.
 */
export class Maybe<A> {
  /**
   * The internal state of the `Maybe`. It is either a value of type `A` or `null`.
   */
  state: A | null;

  /**
   * Creates a `Maybe` instance in the `Just` state with the given value.
   *
   * This is a static method that provides an alternative way to create a `Maybe` that explicitly contains a value.
   * It guarantees that the `Maybe` will be in the `Just` state.
   *
   * @template A - The type of the value to be wrapped in the `Maybe`.
   * @param value - The value to be wrapped in the `Maybe`.
   * @returns A `Maybe<A>` instance in the `Just` state.
   *
   * @example
   * const maybeNumber: Maybe<number> = Maybe.just(5); // maybeNumber is just(5)
   * const maybeString: Maybe<string> = Maybe.just("hello"); // maybeString is just("hello")
   */
  public static just = just;
  /**
   * Creates a `Maybe` instance in the `Nothing` state.
   *
   * This is a static method that provides an alternative way to create a `Maybe` that explicitly represents the absence of a value.
   * It guarantees that the `Maybe` will be in the `Nothing` state.
   *
   * @template A - The type of the value that would have been present if the `Maybe` were in the `Just` state.
   * @returns A `Maybe<A>` instance in the `Nothing` state.
   *
   * @example
   * const nothingMaybe: Maybe<number> = Maybe.nothing(); // nothingMaybe is nothing()
   * const nothingString: Maybe<string> = Maybe.nothing(); // nothingString is nothing()
   */
  public static nothing = nothing;
  /**
   * Creates a `Maybe` instance with the given value.
   *
   * This is a static method that provides a convenience for creating a `Maybe` that may or may not contain a value.
   * If the value is `null`, it will create a `Nothing` instance. Otherwise, it will create a `Just` instance.
   *
   * @template A - The type of the value that may be present.
   * @param value - The value to be wrapped in the `Maybe`. If `null`, the `Maybe` will be in the `Nothing` state.
   * @returns A `Maybe<A>` instance.
   *
   * @example
   * const maybeNumber: Maybe<number> = Maybe.maybe(5); // maybeNumber is just(5)
   * const nothingMaybe: Maybe<number> = Maybe.maybe(null); // nothingMaybe is nothing()
   */
  public static maybe = maybe;

  /**
   * Creates a new `Maybe` instance.
   *
   * @param value - The value to be wrapped in the `Maybe`. If `null`, the `Maybe` will be in the `Nothing` state.
   */
  constructor(value: A | null) {
    this.state = value;
  }

  /**
   * Returns the value contained within the `Maybe` if it's a `Just`, otherwise returns the result of evaluating a function.
   *
   * This method is used to extract the value from a `Maybe` instance, providing a fallback
   * mechanism in case the `Maybe` is `Nothing`. If the `Maybe` is `Just`, the contained value is
   * returned. If the `Maybe` is `Nothing`, the provided function `fn` is evaluated, and its result is returned.
   *
   * @param fn - The function to evaluate and return if the `Maybe` is `Nothing`. It should return a value of type `A`.
   * @returns The value contained within the `Maybe` (if it's a `Just`) or the result of `fn()` (if it's `Nothing`).
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * const number: number = maybeNumber.getOrElse(() => 10); // number is 5
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * const defaultNumber: number = nothingMaybe.getOrElse(() => 10); // defaultNumber is 10
   */
  public getOrElse(fn: () => A): A {
    return this.state === null ? fn() : this.state;
  }

  /**
   * Returns the value contained within the `Maybe` if it's a `Just`, otherwise returns a default value.
   *
   * This method is used to extract the value from a `Maybe` instance, providing a fallback
   * value in case the `Maybe` is `Nothing`. If the `Maybe` is `Just`, the contained value is
   * returned. If the `Maybe` is `Nothing`, the provided `defaultValue` is returned instead.
   *
   * @param defaultValue - The default value to return if the `Maybe` is `Nothing`.
   * @returns The value contained within the `Maybe` (if it's a `Just`) or the `defaultValue` (if it's `Nothing`).
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * const number: number = maybeNumber.getOrElseValue(10); // number is 5
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * const defaultNumber: number = nothingMaybe.getOrElseValue(10); // defaultNumber is 10
   */
  public getOrElseValue(defaultValue: A): A {
    return this.getOrElse(() => defaultValue);
  }

  /**
   * Applies a function to the value inside the `Maybe` if it's a `Just`, otherwise returns `Nothing`.
   *
   * This method is used to transform the value contained within a `Maybe` instance. If the `Maybe`
   * is `Just`, the provided function `fn` is applied to the value, and the result is wrapped in a new
   * `Just`. If the `Maybe` is `Nothing`, it returns `Nothing` without applying the function.
   *
   * @template B - The type of the value contained within the output `Maybe` after applying the function.
   * @param fn - The function to apply to the value inside the `Maybe`. It takes a value of type `A` and returns a value of type `B`.
   * @returns A new `Maybe<B>` with the result of applying `fn` to the value (if it's a `Just`) or `Nothing` (if it's `Nothing`).
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * const maybeString: Maybe<string> = maybeNumber.map((x) => x.toString()); // maybeString is just("5")
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * const nothingString: Maybe<string> = nothingMaybe.map((x) => x.toString()); // nothingString is nothing()
   */
  public map<B>(fn: (a: A) => B): Maybe<B> {
    return this.state === null ? nothing() : just(fn(this.state));
  }

  /**
   * An alias for `map`.
   *
   * @template B - The type of the value contained within the output `Maybe` after applying the function.
   * @param fn - The function to apply to the value inside the `Maybe`. It takes a value of type `A` and returns a value of type `B`.
   * @returns A new `Maybe<B>` with the result of applying `fn` to the value (if it's a `Just`) or `Nothing` (if it's `Nothing`).
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * const maybeString: Maybe<string> = maybeNumber.and((x) => x.toString()); // maybeString is just("5")
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * const nothingString: Maybe<string> = nothingMaybe.and((x) => x.toString()); // nothingString is nothing()
   */
  public and<B>(fn: (a: A) => B): Maybe<B> {
    return this.map(fn);
  }

  /**
   * Applies a function that returns a `Maybe` to the value inside this `Maybe` if it's a `Just`, otherwise returns `Nothing`.
   *
   * This method is used for chaining `Maybe` computations together. If the input `Maybe` is `Just`, the provided function `fn` is
   * applied to the value, and the resulting `Maybe` is returned. If the input `Maybe` is `Nothing`, it returns `Nothing` without
   * applying the function. This is often referred to as "monadic chaining" or "flatMap" in other contexts.
   *
   * @template B - The type of the value contained within the output `Maybe` after applying the function.
   * @param fn - The function to apply to the value inside the `Maybe`. It takes a value of type `A` and returns a `Maybe<B>`.
   * @returns The `Maybe<B>` resulting from applying `fn` to the value (if it's a `Just`) or `Nothing` (if it's `Nothing`).
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * const maybeString: Maybe<string> = maybeNumber.andThen((x) => just(x.toString())); // maybeString is just("5")
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * const nothingString: Maybe<string> = nothingMaybe.andThen((x) => just(x.toString())); // nothingString is nothing()
   *
   * const maybeNumber2: Maybe<number> = just(5);
   * const nothingString2: Maybe<string> = maybeNumber2.andThen((x) => nothing<string>()); // nothingString2 is nothing()
   */
  public andThen<B>(fn: (a: A) => Maybe<B>): Maybe<B> {
    return this.state === null ? nothing() : fn(this.state);
  }

  /**
   * Returns this `Maybe` if it's a `Just`, otherwise returns the `Maybe` returned by evaluating a function.
   *
   * This method is like a boolean OR. If this `Maybe` is `Just`, it's returned. Otherwise, the provided function `fn` is
   * evaluated, and the resulting `Maybe` is returned.
   *
   * @param fn - The function to evaluate and return a `Maybe<A>` if this `Maybe` is `Nothing`.
   * @returns This `Maybe` (if it's a `Just`) or the result of `fn()` (if it's `Nothing`).
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * const result: Maybe<number> = maybeNumber.orElse(() => just(10)); // result is just(5)
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * const result2: Maybe<number> = nothingMaybe.orElse(() => just(10)); // result2 is just(10)
   *
   * const nothingMaybe2: Maybe<number> = nothing();
   * const result3: Maybe<number> = nothingMaybe2.orElse(() => nothing()); // result3 is nothing()
   */
  public orElse(fn: () => Maybe<A>): Maybe<A> {
    return this.state === null ? fn() : this;
  }

  /**
   * Performs pattern matching on this `Maybe` instance, executing different functions based on whether it's a `Just` or `Nothing`.
   *
   * This method allows you to handle both the `Just` and `Nothing` cases of a `Maybe` in a structured way.
   * It takes a `Catamorphism` object, which defines how to handle each case.
   * If the `Maybe` is `Just`, the `Just` function from the `Catamorphism` is called with the contained value.
   * If the `Maybe` is `Nothing`, the `Nothing` function from the `Catamorphism` is called.
   *
   * @template B - The type of the result produced by the `Catamorphism` functions.
   * @param matcher - A `Catamorphism` object containing `Just` and `Nothing` functions.
   * @returns The result of applying the appropriate function from `matcher` to this `Maybe`.
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * const result: string = maybeNumber.cata({
   *   Just: (x) => `The value is ${x}`,
   *   Nothing: () => "There is no value",
   * }); // result is "The value is 5"
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * const nothingResult: string = nothingMaybe.cata({
   *   Just: (x) => `The value is ${x}`,
   *   Nothing: () => "There is no value",
   * }); // nothingResult is "There is no value"
   */

  public cata<B>(matcher: Catamorphism<A, B>): B {
    return this.state === null ? matcher.Nothing() : matcher.Just(this.state);
  }

  /**
   * Encapsulates a common pattern of needing to build up an Object from
   * a series of Maybe values. This is often solved by nesting `andThen` calls
   * and then completing the chain with a call to `success`.
   *
   * This feature was inspired (and the code lifted from) this article:
   * https://medium.com/@dhruvrajvanshi/simulating-haskells-do-notation-in-typescript-e48a9501751c
   *
   * Wrapped values are converted to an Object using the Object constructor
   * before assigning. Primitives won't fail at runtime, but results may
   * be unexpected.
   *
   * @template K - The type of the key to assign to.
   * @template B - The type of the value to assign.
   * @param k - The key to assign the value to.
   * @param other - Either a `Maybe<B>` or a function that takes the current value and returns a `Maybe<B>`.
   * @returns A new `Maybe` containing the merged object, or `Nothing` if either this `Maybe` or `other` is `Nothing`.
   *
   * @example
   * const result = just({})
   *   .assign("foo", just(5))
   *   .assign("bar", just("hello")); // result is just({ foo: 5, bar: "hello" })
   *
   * const result2 = nothing<object>().assign("foo", just(5)); // result2 is nothing()
   *
   * const result3 = just({}).assign("foo", nothing()); // result3 is nothing()
   *
   * const result4 = just({}).assign("foo", (x) => just(5)); // result4 is just({ foo: 5 })
   *
   * const result5 = just({}).assign("foo", (x) => nothing()); // result5 is nothing()
   */
  public assign<K extends string, B extends Object>(
    k: K,
    other: Maybe<B> | ((a: A) => Maybe<B>)
  ): Maybe<A & { [k in K]: B }> {
    if (this.state === null) {
      return nothing();
    }
    if (typeof this.state !== "object" || this.state === null) {
      return nothing();
    }
    const maybe = typeof other === "function" ? other(this.state) : other;
    return maybe.map<A & { [k in K]: B }>((b) => {
      const newState = {
        ...this.state,
        [k]: b,
      };
      return newState as A & { [k in K]: B };
    });
  }

  /**
   * Inject a side-effectual operation into a chain of maybe operations.
   *
   * The primary use case for `do` is to perform logging in the middle of a flow
   * of Maybe computations.
   *
   * The side effect only runs when there is a value (Just).
   *
   * The value will (should) remain unchanged during the `do` operation.
   *
   * @param fn - The function to call with the value if it's a `Just`.
   * @returns This `Maybe` instance, unchanged.
   *
   * @example
   * just({})
   *   .assign('foo', just(42))
   *   .assign('bar', just('hello'))
   *   .do(scope => console.log('Scope: ', JSON.stringify(scope)))
   *   .map(doSomethingElse)
   *
   * @example
   * just(5).do((x) => console.log(`The value is ${x}`)); // Logs "The value is 5"
   * nothing().do((x) => console.log(`The value is ${x}`)); // Does not log anything
   */
  public do(fn: (a: A) => void): Maybe<A> {
    if (this.state !== null) {
      fn(this.state);
    }
    return this;
  }

  /**
   * Inject a side-effectual operation into a chain of maybe operations.
   *
   * The side effect only runs when there is not a value (Nothing).
   *
   * Otherwise, `elseDo` passes the Nothing state along the call chain.
   *
   * @param fn - The function to call if it's a `Nothing`.
   * @returns This `Maybe` instance, unchanged.
   *
   * @example
   * nothing().elseDo(() => console.log("There is nothing here")); // Logs "There is nothing here"
   * just(5).elseDo(() => console.log("There is nothing here")); // Does not log anything
   */
  public elseDo(fn: () => void): Maybe<A> {
    if (this.state === null) {
      fn();
    }
    return this;
  }

  /**
   * Returns `true` if the `Maybe` is a `Just`.
   *
   * This method also acts as a type guard, narrowing the type of the `Maybe` to `Maybe<A> & { state: A }`
   * when it returns `true`.
   *
   * @returns `true` if the `Maybe` is a `Just`, `false` otherwise.
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * if (maybeNumber.isJust()) {
   *   console.log(maybeNumber.state); // Safe to access `state` here because of the type guard
   * }
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * if (nothingMaybe.isJust()) {
   *   console.log(nothingMaybe.state); // This code will not be executed
   * }
   */
  public isJust(): this is Maybe<A> & { state: A } {
    return this.state !== null;
  }

  /**
   * Returns `true` if the `Maybe` is a `Nothing`.
   *
   * This method also acts as a type guard, narrowing the type of the `Maybe` to `Maybe<A> & { state: null }`
   * when it returns `true`. This allows you to safely assume that the `state` property is `null` within
   * conditional blocks where `isNothing()` returns `true`.
   *
   * @returns `true` if the `Maybe` is a `Nothing`, `false` otherwise.
   *
   * @example
   * const maybeNumber: Maybe<number> = nothing();
   * if (maybeNumber.isNothing()) {
   *   console.log(maybeNumber.state); // Safe to access `state` here, and it will be `null`
   * }
   *
   * const justMaybe: Maybe<number> = just(5);
   * if (justMaybe.isNothing()) {
   *   console.log(justMaybe.state); // This code will not be executed
   * }
   */
  public isNothing(): this is Maybe<A> & { state: null } {
    return this.state === null;
  }

  /**
   * Filters the value contained within the `Maybe` based on a predicate function.
   *
   * If the `Maybe` is `Just` and the predicate function returns `true` for the contained value,
   * the original `Maybe` is returned. If the `Maybe` is `Just` and the predicate function returns
   * `false`, `Nothing` is returned. If the `Maybe` is `Nothing`, `Nothing` is returned.
   *
   * This method is useful for conditionally keeping or discarding a value within a `Maybe` chain.
   *
   * @param predicate - A function that takes the contained value (if present) and returns `true` to keep the value or `false` to discard it.
   * @returns The original `Maybe` if it's `Just` and the predicate returns `true`, `Nothing` otherwise.
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * const filteredMaybe: Maybe<number> = maybeNumber.filter((x) => x > 3); // filteredMaybe is just(5)
   *
   * const filteredMaybe2: Maybe<number> = maybeNumber.filter((x) => x > 10); // filteredMaybe2 is nothing()
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * const filteredNothing: Maybe<number> = nothingMaybe.filter((x) => x > 3); // filteredNothing is nothing()
   */
  public filter(predicate: (a: A) => boolean): Maybe<A> {
    return this.exists(predicate) ? this : nothing();
  }

  /**
   * Checks if the `Maybe` is `Just` and if the contained value satisfies a given predicate.
   *
   * If the `Maybe` is `Just`, the predicate function is applied to the contained value.
   * If the predicate returns `true`, this method returns `true`. Otherwise, it returns `false`.
   * If the `Maybe` is `Nothing`, this method returns `false` without applying the predicate.
   *
   * This method is useful for checking if a value meets a certain condition without unwrapping it.
   *
   * @param predicate - A function that takes the contained value (if present) and returns `true` if the value satisfies the condition, `false` otherwise.
   * @returns `true` if the `Maybe` is `Just` and the predicate returns `true`, `false` otherwise.
   *
   * @example
   * const maybeNumber: Maybe<number> = just(5);
   * const exists: boolean = maybeNumber.exists((x) => x > 3); // exists is true
   *
   * const exists2: boolean = maybeNumber.exists((x) => x > 10); // exists2 is false
   *
   * const nothingMaybe: Maybe<number> = nothing();
   * const exists3: boolean = nothingMaybe.exists((x) => x > 3); // exists3 is false
   */
  public exists(predicate: (a: A) => boolean): boolean {
    return this.state !== null && predicate(this.state);
  }

  /**
   * Applies a `Maybe` containing a function to this `Maybe` containing a value.
   *
   * If both `Maybe` instances are `Just`, the function inside the first `Maybe` is applied to the value inside this `Maybe`,
   * and the result is wrapped in a new `Just`. If either `Maybe` is `Nothing`, `Nothing` is returned.
   *
   * This method is useful for working with functions that take multiple arguments, where each argument might be optional.
   *
   * @template B - The type of the value contained within the output `Maybe` after applying the function.
   * @param maybeFn - A `Maybe` instance containing a function that takes a value of type `A` and returns a value of type `B`.
   * @returns A new `Maybe<B>` with the result of applying the function (if both are `Just`) or `Nothing` (if either is `Nothing`).
   *
   * @example
   * const maybeAdd: Maybe<(x: number) => number> = just((x: number) => x + 1);
   * const maybeNumber: Maybe<number> = just(5);
   * const result: Maybe<number> = maybeNumber.ap(maybeAdd); // result is just(6)
   *
   * const nothingMaybe: Maybe<(x: number) => number> = nothing();
   * const result2: Maybe<number> = maybeNumber.ap(nothingMaybe); // result2 is nothing()
   *
   * const nothingMaybe2: Maybe<number> = nothing();
   * const result3: Maybe<number> = nothingMaybe2.ap(maybeAdd); // result3 is nothing()
   */
  public ap<B>(maybeFn: Maybe<(a: A) => B>): Maybe<B> {
    return maybeFn.isJust() ? this.map(maybeFn.state) : nothing();
  }
}

export default Maybe;
