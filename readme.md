# maybeasy

[![Build Status](https://travis-ci.org/kofno/maybeasy.svg?branch=master)](https://travis-ci.org/kofno/maybeasy)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=plastic)](https://github.com/semantic-release/semantic-release)

Whether we like it or not, not every computation in a program is going to
return a value. Sometimes there's no value to return. Other times, something
goes wrong and we're just not sure what value to return.

In JavaScript we often will return null or undefined to represent the value
of Nothing, however we arrive at that value. This can often lead to failures
at runtime when we forget (or are unaware) that a value may be nothing.
Strict null checking makes this situation tolerable in Typescript, if only by
nagging you every place you need to check for Nothing.

Arrays are less prone to these types of failures, because if when there is
nothing, we return an empty array. We can safely apply functions to an array
without being concerned if there are values present, because an empty array and
a populated array have the same interface. Can that same principle be applied
to singular values?

Sure it can! The Maybe type offers a way to express that a value may be something,
or it may be nothing. Our intuition for mapping over arrays is applicable here.

## the functor (this map)

Given a computation that may or may not return a value, we can apply logic to
this value by mapping pure functions over the result of the computation. For
example:

    const fetchSomething = (): Maybe<number> => ...; // <-- may or may not return something

    const add2 = (n) => n + 2;

    fetchSomething().map(add2); //

In this example, we add2 to the number that we fetched. But if the there is no
number -- it's Nothing -- the result of add2 is... Nothing. We won't get a
runtime error.

## chaining (the flat map)

Let's say that we have two computations. Both may return nothing, but one of the
computations depends on the other.

    const fetchSomething = (): Maybe<number> => ...;

    const fetchSomethingElse = (n: number): Maybe<string> => ...; // <-- also may or may not return something

We _could_ use a map here, as in this examples:

    fetchSomething().map(fetchSomethingElse);

The problem with this is that we will end up a maybe nested inside another maybe.
You intuition for Arrays applies here, too; if we map over an Array with a function
that returns an Array, we end up with an Array of Arrays. That same thinking
applies here; we'll end up with `Maybe<Maybe<string>>`.

To chain computations that both may return nothing, we need a different tool:
`andThen`. We can rewrite our previous example, but just replace `map` with
`andThen`:

    fetchSomething().andThen(fetchSomethingElse);

If either computation is Nothing, the result is nothing. If both computations
succeed, then we have `Maybe<string>`.

## unwrapping the value

At some point, we may need to send our result to another part of the system.
The other part of the system may not understand Maybe values. Or possibly this
value needs to be serialized as a string for sending to a third party. We need
a safe way to _unwrap_ this value. For this purpose we have `getOrElse`.

`getOrElse` will return the value if it is present, but it requires us to provide
a default value, in the case that we have Nothing. For this case where we have
to send a string to another part of the system, we may call `getOrElse` with
and empty string, or 'N/A', or some other place holder text.

This makes _unwrapping_ the value safe.

## putting it all together

We can, of course, chain and map all we want to create a pipeline of data processors.
At the end we can unwrap our value for consumption by humans or other systems.
For example:

    fetchSomething().map(add2).andThen(fetchSomethingElse).getOrElse('No data');

# install

> npm install --save maybeasy

> yarn add maybeasy

# usage

    import { just, nothing } from 'maybeasy';

    function parse(s) {
      try {
        return just(JSON.parse(s));
      }
      catch(e) {
        return nothing();
      }
    }

# docs

[API](https://kofno.github.io/maybeasy)
