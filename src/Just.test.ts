import { assertObjectMatch } from "https://deno.land/std@0.208.0/assert/assert_object_match.ts";
import { assert, assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { andThen, isJust, just, map } from "./index.ts";

Deno.test('Just.getOrElse', () => {
  const result = just('foo');
  assertEquals(
    'foo',
    result.getOrElse(() => 'bar'),
    'Returns the Just value'
  );
});

Deno.test('Just.map', () => {
  just('foo').map(s => assertEquals('foo', s, 'map fn gets value'));
});

Deno.test('Just.andThen', () => {
  just('foo').andThen(_ => just(assert(true, 'andThen runs')));
});

Deno.test('Just.cata', () => {
  just('foo').cata({
    Just: () => assert(true, 'Just matcher ran as expected.'),
    Nothing: () => assert(false, 'Nothing matcher should not run')
  });
});

Deno.test('isJust', () => {
  assert(isJust(just('foo')), 'Expect isJust to be true');
});

Deno.test('Just.assign', () => {
  just({})
    .assign('x', just(42))
    .assign('y', just('a thing'))
    .map(v => assertObjectMatch(v, { x: 42, y: 'a thing' }));

  just(2)
    .assign('x', just(42))
    .map(v => assertEquals(v.x, 42));
});

Deno.test('Just.do', () => {
  just({})
    .assign('foo', just(42))
    .assign('bar', just('hello'))
    .do(scope => assertObjectMatch({ foo: 42, bar: 'hello' }, scope))
    .cata({
      Just: v => assert(true, `All is well! ${JSON.stringify(v)}`),
      Nothing: () => assert(false, 'Should not be Nothing')
    });
});

Deno.test('Just.elseDo', () => {
  just('foo')
    .elseDo(() => assert(false, `'elseDo' should not run on just`))
    .cata({
      Just: x => assert(true, `All is well: ${JSON.stringify(x)}`),
      Nothing: () => assert(false, 'Should have a value')
    });
});

Deno.test('map(Just)', () => {
  const foo = just(1);
  const add1 = (n: number) => n + 1;

  map(add1, foo).do(x => assertEquals(2, x)).elseDo(() => assert(false, 'Should have a value'));
  map(add1)(foo).do(x => assertEquals(2, x)).elseDo(() => assert(false, 'Should have a value'));
});

Deno.test('andThen(Just)', () => {
  const foo = just(1);
  const bar = (n: number) => just(n + 1);

  andThen(bar, foo).do(x => assertEquals(2, x)).elseDo(() => assert(false, 'Should have a value'));
});
