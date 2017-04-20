declare abstract class Maybe<A> {
    abstract getOrElse(defaultValue: A): A;
    abstract map<B>(fn: (a: A) => B): Maybe<B>;
    abstract andThen<B>(fn: (a: A) => Maybe<B>): Maybe<B>;
    abstract cata<B>(matcher: Catamorphism<A, B>): B;
}
export default Maybe;
