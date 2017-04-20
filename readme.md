# maybeasy

A Maybe implementation in TypeScript. Useful for handling optional variables
and other scenarios where a computation may return nothing for a result.

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
