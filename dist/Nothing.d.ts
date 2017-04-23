import Catamorphism from './Catamorphism';
import Maybe from './Maybe';
export declare class Nothing extends Maybe<any> {
    getOrElse(defaultValue: any): any;
    map<B>(fn: (a: any) => B): Maybe<B>;
    andThen<B>(fn: (a: any) => Maybe<B>): Maybe<B>;
    cata<B>(matcher: Catamorphism<any, B>): B;
}
export declare function nothing(): Nothing;
export default Nothing;
