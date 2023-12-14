import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { just } from "https://deno.land/x/maybeasy@v6.0.0/mod.ts";

Deno.test(function testRelease() {
  just(1)
    .map((x) => x + 1)
    .andThen((x) => just(x + 1))
    .do((x) => assert(x === 3))
    .elseDo(() => assert(false));
})
