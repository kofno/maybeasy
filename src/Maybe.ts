import Catamorphism from './Catamorphism';

/**
 * Maybe describes a value that is optional. It is safer to use then null and
 * undefined.
 */
abstract class Maybe<A> {
  /**
   * Returns the maybe value if it is nonempty. Otherwise returns the result
   * of evaluating fn.
   */
  public abstract getOrElse(fn: () => A): A;

  /**
   * Returns the maybe value if it is nonempty. Otherwise returns the
   * defaultValue.
   */
  public abstract getOrElseValue(defaultValue: A): A;

  /**
   * If there's a value, apply the function and return a new Maybe. Mapping
   * over Nothing returns Nothing.
   */
  public abstract map<B>(fn: (a: A) => B): Maybe<B>;

  /**
   * Chain Maybe computations together. If any computation returns a Nothing,
   * then Nothing is the result of the computation.
   */
  public abstract andThen<B>(fn: (a: A) => Maybe<B>): Maybe<B>;

  /**
   * Folds over types; a switch/case for Just<A>/Nothing.
   */
  public abstract cata<B>(matcher: Catamorphism<A, B>): B;

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
   */
  public abstract assign<K extends string, B>(
    k: K,
    other: Maybe<B> | ((a: A) => Maybe<B>)
  ): Maybe<A & { [k in K]: B }>;
}

export default Maybe;
