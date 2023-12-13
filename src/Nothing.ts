import Catamorphism from './Catamorphism.ts';
import Maybe from './Maybe.ts';

export class Nothing<A> extends Maybe<A> {
  public getOrElse(fn: () => A) {
    return fn();
  }

  public getOrElseValue(defaultValue: A) {
    return defaultValue;
  }

  public map<B>(_fn: (a: A) => B): Maybe<B> {
    return new Nothing<B>();
  }

  public andThen<B>(_fn: (a: A) => Maybe<B>): Maybe<B> {
    return new Nothing<B>();
  }

  public orElse(fn: () => Maybe<A>): Maybe<A> {
    return fn();
  }

  public cata<B>(matcher: Catamorphism<any, B>): B {
    return matcher.Nothing();
  }

  public assign<K extends string, B>(
    _k: K,
    _other: Maybe<B> | ((a: A) => Maybe<B>)
  ): Maybe<A & { [k in K]: B }> {
    return new Nothing<A & { [k in K]: B }>();
  }

  public do(_fn: (a: A) => void): Maybe<A> {
    return new Nothing<A>();
  }

  public elseDo(fn: () => void): Maybe<A> {
    fn();
    return this;
  }

  public isJust(): boolean {
    return false;
  }

  public isNothing(): boolean {
    return true;
  }
}

export const nothing = <A>(): Maybe<A> => new Nothing<A>();

export default Nothing;
