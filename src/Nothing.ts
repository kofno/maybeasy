import Catamorphism from './Catamorphism';
import Maybe from './Maybe';

class Nothing extends Maybe<any> {

  public getOrElse(defaultValue: any) {
    return defaultValue;
  }

  public map<B>(fn: (a: any) => B): Maybe<B> {
    return this as Maybe<B>;
  }

  public andThen<B>(fn: (a: any) => Maybe<B>): Maybe<B> {
    return this as Maybe<B>;
  }

  public cata<B>(matcher: Catamorphism<any, B>): B {
    return matcher.Nothing();
  }

}

function nothing() { return new Nothing(); }

export { nothing };
export default Nothing;
