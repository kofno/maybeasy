import Catamorphism from './Catamorphism';
import Maybe from './Maybe';

export class Nothing<A> extends Maybe<A> {
  public getOrElse(fn: () => A) {
    return fn();
  }

  public getOrElseValue(defaultValue: A) {
    return defaultValue;
  }

  public map<B>(fn: (a: A) => B): Maybe<B> {
    return new Nothing<B>();
  }

  public andThen<B>(fn: (a: A) => Maybe<B>): Maybe<B> {
    return new Nothing<B>();
  }

  public cata<B>(matcher: Catamorphism<any, B>): B {
    return matcher.Nothing();
  }
}

export const nothing = <A>(): Maybe<A> => new Nothing<A>();

export default Nothing;
