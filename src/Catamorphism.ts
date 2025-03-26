/**
 * Represents a Catamorphism, a functional pattern for deconstructing or folding
 * over a data structure, specifically for handling `Maybe`-like types.
 *
 * @template A - The type of the value contained in the `Just` case.
 * @template B - The type of the result produced by applying the catamorphism.
 *
 * @property Just - A function that handles the `Just` case, taking a value of type `A`
 * and returning a result of type `B`.
 * @property Nothing - A function that handles the `Nothing` case, returning a result
 * of type `B`.
 */
export interface Catamorphism<A, B> {
  Just: (value: A) => B;
  Nothing: () => B;
}

export default Catamorphism;
