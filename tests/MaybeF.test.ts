import * as test from 'tape';
import { andThen, just, map, nothing, withDefault } from '../src/MaybeF';

const toUpper = (v: string) => v.toUpperCase();
const toUpperM = (v: string) => just(v.toUpperCase());

test('MaybeF.map', t => {
  const foo = withDefault('bar', map(toUpper, just('foo')));
  t.equal('FOO', foo, 'Mapped over Just');

  const bar = withDefault('bar', map(toUpper, nothing()));
  t.equal('bar', bar, 'Mapped over nothing');

  t.end();
});

test('MaybeF.andThen', t => {
  const foo = withDefault('bar', andThen(toUpperM, just('foo')));
  t.equal('FOO', foo, 'bind over Just');

  const bar = withDefault('bar', andThen(toUpperM, nothing()));
  t.equal('bar', bar, 'bind over Nothing');

  t.end();
});
