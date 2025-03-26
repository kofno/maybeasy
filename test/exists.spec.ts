import { describe, it, expect } from "bun:test";
import { exists } from "../src/functions";
import Maybe, { just, nothing } from "../src/Maybe";

describe("exists", () => {
  it("should return true if the Maybe is Just and the predicate returns true", () => {
    const maybeNumber: Maybe<number> = just(5);
    const result = exists((x) => x > 3, maybeNumber);
    expect(result).toBe(true);
  });

  it("should return false if the Maybe is Just and the predicate returns false", () => {
    const maybeNumber: Maybe<number> = just(5);
    const result = exists((x) => x > 10, maybeNumber);
    expect(result).toBe(false);
  });

  it("should return false if the Maybe is Nothing", () => {
    const nothingMaybe: Maybe<number> = nothing();
    const result = exists((x) => x > 3, nothingMaybe);
    expect(result).toBe(false);
  });

  it("should work in curried form", () => {
    const isGreaterThanThree = exists((x: number) => x > 3);
    const maybeNumber: Maybe<number> = just(5);
    const result = isGreaterThanThree(maybeNumber);
    expect(result).toBe(true);
  });

  it("should return false in curried form if the predicate returns false", () => {
    const isGreaterThanThree = exists((x: number) => x > 3);
    const result = isGreaterThanThree(just(2));
    expect(result).toBe(false);
  });

  it("should return false in curried form if it is a Nothing", () => {
    const isGreaterThanThree = exists((x: number) => x > 3);
    const result = isGreaterThanThree(nothing());
    expect(result).toBe(false);
  });
});

describe("Maybe.exists", () => {
  it("should return true if the Maybe is Just and the predicate returns true", () => {
    const maybeNumber: Maybe<number> = just(5);
    const result = maybeNumber.exists((x) => x > 3);
    expect(result).toBe(true);
  });

  it("should return false if the Maybe is Just and the predicate returns false", () => {
    const maybeNumber: Maybe<number> = just(5);
    const result = maybeNumber.exists((x) => x > 10);
    expect(result).toBe(false);
  });

  it("should return false if the Maybe is Nothing", () => {
    const nothingMaybe: Maybe<number> = nothing();
    const result = nothingMaybe.exists((x) => x > 3);
    expect(result).toBe(false);
  });
});
