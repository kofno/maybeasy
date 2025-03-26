import { describe, it, expect } from "bun:test";
import { ap } from "../src/functions";
import Maybe, { just, nothing } from "../src/Maybe";

describe("ap", () => {
  it("should apply the function if both are Just", () => {
    const maybeAdd: Maybe<(x: number) => number> = just((x: number) => x + 1);
    const maybeNumber: Maybe<number> = just(5);
    const result: Maybe<number> = ap(maybeAdd, maybeNumber);
    expect(result.isJust()).toBe(true);
    expect(result.state).toBe(6);
  });

  it("should return Nothing if the function is Nothing", () => {
    const maybeAdd: Maybe<(x: number) => number> = nothing();
    const maybeNumber: Maybe<number> = just(5);
    const result: Maybe<number> = ap(maybeAdd, maybeNumber);
    expect(result.isNothing()).toBe(true);
  });

  it("should return Nothing if the value is Nothing", () => {
    const maybeAdd: Maybe<(x: number) => number> = just((x: number) => x + 1);
    const maybeNumber: Maybe<number> = nothing();
    const result: Maybe<number> = ap(maybeAdd, maybeNumber);
    expect(result.isNothing()).toBe(true);
  });

  it("should work in curried form", () => {
    const addOne = ap(just((x: number) => x + 1));
    const maybeNumber: Maybe<number> = just(5);
    const result: Maybe<number> = addOne(maybeNumber);
    expect(result.isJust()).toBe(true);
    expect(result.state).toBe(6);
  });

  it("should return Nothing in curried form if the function is Nothing", () => {
    const addOne = ap<number, number>(nothing());
    const maybeNumber: Maybe<number> = just(5);
    const result: Maybe<number> = addOne(maybeNumber);
    expect(result.isNothing()).toBe(true);
  });

  it("should return Nothing in curried form if the value is Nothing", () => {
    const addOne = ap(just((x: number) => x + 1));
    const maybeNumber: Maybe<number> = nothing();
    const result: Maybe<number> = addOne(maybeNumber);
    expect(result.isNothing()).toBe(true);
  });
});

describe("Maybe.ap", () => {
  it("should apply the function if both are Just", () => {
    const maybeAdd: Maybe<(x: number) => number> = just((x: number) => x + 1);
    const maybeNumber: Maybe<number> = just(5);
    const result: Maybe<number> = maybeNumber.ap(maybeAdd);
    expect(result.isJust()).toBe(true);
    expect(result.state).toBe(6);
  });

  it("should return Nothing if the function is Nothing", () => {
    const maybeAdd: Maybe<(x: number) => number> = nothing();
    const maybeNumber: Maybe<number> = just(5);
    const result: Maybe<number> = maybeNumber.ap(maybeAdd);
    expect(result.isNothing()).toBe(true);
  });

  it("should return Nothing if the value is Nothing", () => {
    const maybeAdd: Maybe<(x: number) => number> = just((x: number) => x + 1);
    const maybeNumber: Maybe<number> = nothing();
    const result: Maybe<number> = maybeNumber.ap(maybeAdd);
    expect(result.isNothing()).toBe(true);
  });
});
