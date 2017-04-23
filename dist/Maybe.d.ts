import Catamorphism from './Catamorphism';
/**
 * Maybe describes a value that is optional. It is safer to use then null and
 * undefined.
 */
declare abstract class Maybe<A> {
    /**
     * If the Maybe computation resulted in a value, return it. Else, return
     * the defaultValue.
     */
    abstract getOrElse(defaultValue: A): A;
    /**
     * If there's a value, apply the function and return a new Maybe. Mapping
     * over Nothing returns Nothing.
     */
    abstract map<B>(fn: (a: A) => B): Maybe<B>;
    /**
     * Chain Maybe computations together. If any computation returns a Nothing,
     * then Nothing is the result of the computation.
     */
    abstract andThen<B>(fn: (a: A) => Maybe<B>): Maybe<B>;
    /**
     * Folds over types; a switch/case for Just<A>/Nothing.
     */
    abstract cata<B>(matcher: Catamorphism<A, B>): B;
}
export default Maybe;
