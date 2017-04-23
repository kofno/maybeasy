import Catamorphism from './Catamorphism';
import Maybe from './Maybe';
export declare class Just<A> extends Maybe<A> {
    private value;
    constructor(theValue: A);
    getOrElse(defaultValue: A): A;
    map<B>(fn: (a: A) => B): Maybe<B>;
    andThen<B>(fn: (a: A) => Maybe<B>): Maybe<B>;
    cata<B>(matcher: Catamorphism<A, B>): B;
}
export declare function just<A>(value: A): Just<A>;
export default Just;
