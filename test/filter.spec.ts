import { describe, it, expect } from "bun:test";
import { filter } from "../src/functions";
import Maybe, { just, nothing } from "../src/Maybe";

describe("filter", () => {
  it("should return the original Maybe if it is a Just and the predicate returns true", () => {
    const maybeNumber: Maybe<number> = just(5);
    const result = filter((x) => x > 3, maybeNumber);
    expect(result.isJust()).toBe(true);
    expect(result.state).toBe(5);
  });

  it("should return Nothing if it is a Just and the predicate returns false", () => {
    const maybeNumber: Maybe<number> = just(5);
    const result = filter((x) => x > 10, maybeNumber);
    expect(result.isNothing()).toBe(true);
  });

  it("should return Nothing if it is a Nothing", () => {
    const nothingMaybe: Maybe<number> = nothing();
    const result = filter((x) => x > 3, nothingMaybe);
    expect(result.isNothing()).toBe(true);
  });

  it("should work in curried form", () => {
    const isGreaterThanThree = filter((x: number) => x > 3);
    const maybeNumber: Maybe<number> = just(5);
    const result = isGreaterThanThree(maybeNumber);
    expect(result.isJust()).toBe(true);
    expect(result.state).toBe(5);
  });

  it("should return Nothing in curried form if the predicate returns false", () => {
    const isGreaterThanThree = filter((x: number) => x > 3);
    const result = isGreaterThanThree(just(2));
    expect(result.isNothing()).toBe(true);
  });

  it("should return Nothing in curried form if it is a Nothing", () => {
    const isGreaterThanThree = filter((x: number) => x > 3);
    const result = isGreaterThanThree(nothing());
    expect(result.isNothing()).toBe(true);
  });
});

describe("Maybe.filter", () => {
  it("should return the original Maybe if it is a Just and the predicate returns true", () => {
    const maybeNumber: Maybe<number> = just(5);
    const result = maybeNumber.filter((x) => x > 3);
    expect(result.isJust()).toBe(true);
    expect(result.state).toBe(5);
  });

  it("should return Nothing if it is a Just and the predicate returns false", () => {
    const maybeNumber: Maybe<number> = just(5);
    const result = maybeNumber.filter((x) => x > 10);
    expect(result.isNothing()).toBe(true);
  });

  it("should return Nothing if it is a Nothing", () => {
    const nothingMaybe: Maybe<number> = nothing();
    const result = nothingMaybe.filter((x) => x > 3);
    expect(result.isNothing()).toBe(true);
  });
});
