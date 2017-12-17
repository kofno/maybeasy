import Catamorphism from './Catamorphism';
import Maybe from './Maybe';

export class Just<A> extends Maybe<A> {
  private value: A;

  constructor(theValue: A) {
    super();
    this.value = theValue;
  }

  public getOrElse(fn: () => A) {
    return this.value;
  }

  public getOrElseValue(defaultValue: A) {
    return this.value;
  }

  public map<B>(fn: (a: A) => B): Maybe<B> {
    return new Just(fn(this.value));
  }

  public andThen<B>(fn: (a: A) => Maybe<B>): Maybe<B> {
    return fn(this.value);
  }

  public cata<B>(matcher: Catamorphism<A, B>): B {
    return matcher.Just(this.value);
  }
}

export const just = <A>(value: A): Maybe<A> => new Just<A>(value);

export default Just;
