import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { andThen, isNothing, just, map, nothing } from "./index.ts";

Deno.test('Nothing.getOrElse', () => {
  const result = nothing<string>().getOrElse(() => 'foo');
  assertEquals('foo', result, 'getOrElse returns orElse value');
});

Deno.test('Nothing.map', () => {
  nothing<string>().map(_ => assert(false, "map shouldn't run"));
});

Deno.test('Nothing.andThen', () => {
  nothing<string>().andThen(_ => just(assert(false, 'andThen should not run')));
});

Deno.test('Nothing.cata', () => {
  nothing<string>().cata({
    Just: _ => assert(false, 'Just branch should never run'),
    Nothing: () => assert(true, 'Nothing branch executed as expected')
  });
});

Deno.test('isNothing', () => {
  assert(isNothing(nothing<string>()), 'Expected isNothing to be true');
});

Deno.test('Nothing.assign', () => {
  const assigned = nothing().assign('x', just('foo'));
  assert(isNothing(assigned));
});

Deno.test('Nothing.do', () => {
  nothing()
    .do(x => assert(false, `'do' should not run on nothing: ${JSON.stringify(x)}`))
    .cata({
      Just: x => assert(false, `Should not have a value: ${JSON.stringify(x)}`),
      Nothing: () => assert(true, 'Nothing, as expected')
    });
});

Deno.test('Nothing.elseDo', () => {
  nothing()
    .elseDo(() => assert(true, 'elseDo happened'))
    .cata({
      Just: x => assert(false, `Should not have a value: ${JSON.stringify(x)}`),
      Nothing: () => assert(true, 'Nothing, as expected')
    });
});

Deno.test('map(Nothing)', () => {
  const foo = nothing<number>();

  map(n => n + 1, foo)
    .do(_ => assert(false, 'Should not have a value'))
    .elseDo(() => assert(true, 'Should be nothing'));
});

Deno.test('andThen(Nothing)', () => {
  const foo = nothing<number>();

  andThen(n => just(n + 1), foo)
    .do(_ => assert(false, 'Should not have a value'))
    .elseDo(() => assert(true, 'Should be nothing'));
});
