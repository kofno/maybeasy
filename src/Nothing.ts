import Catamorphism from './Catamorphism';
import Maybe from './Maybe';

export class Nothing extends Maybe<any> {
  public getOrElse(defaultValue: any) {
    return defaultValue;
  }

  public map<B>(fn: (a: any) => B): Maybe<B> {
    return this;
  }

  public andThen<B>(fn: (a: any) => Maybe<B>): Maybe<B> {
    return this;
  }

  public cata<B>(matcher: Catamorphism<any, B>): B {
    return matcher.Nothing();
  }
}

export function nothing() {
  return new Nothing();
}

export default Nothing;
