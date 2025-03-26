import { describe, it, expect } from "bun:test";
import {
  fromNullable,
  fromEmpty,
  isJust,
  isNothing,
  map,
  andThen,
  getOrElseValue,
  getOrElse,
  cata,
  traverse,
  sequence,
} from "../src/functions";
import Maybe, { just, nothing, maybe } from "../src/Maybe";

describe("functions", () => {
  describe("fromNullable", () => {
    it("should return Just with the value if it is not null or undefined", () => {
      const result = fromNullable(5);
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(5);
    });

    it("should return Nothing if the value is null", () => {
      const result = fromNullable(null);
      expect(result.isNothing()).toBe(true);
    });

    it("should return Nothing if the value is undefined", () => {
      const result = fromNullable(undefined);
      expect(result.isNothing()).toBe(true);
    });
  });

  describe("fromEmpty", () => {
    it("should return Just with the value if it is not empty", () => {
      const result = fromEmpty([1, 2, 3]);
      expect(result.isJust()).toBe(true);
      expect(result.state).toEqual([1, 2, 3]);
    });

    it("should return Nothing if the value is an empty array", () => {
      const result = fromEmpty([]);
      expect(result.isNothing()).toBe(true);
    });

    it("should return Just with the value if it is not an empty string", () => {
      const result = fromEmpty("hello");
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe("hello");
    });

    it("should return Nothing if the value is an empty string", () => {
      const result = fromEmpty("");
      expect(result.isNothing()).toBe(true);
    });
  });

  describe("isJust", () => {
    it("should return true if the Maybe is a Just", () => {
      const result = isJust(just(5));
      expect(result).toBe(true);
    });

    it("should return false if the Maybe is a Nothing", () => {
      const result = isJust(nothing());
      expect(result).toBe(false);
    });
  });

  describe("isNothing", () => {
    it("should return true if the Maybe is a Nothing", () => {
      const result = isNothing(nothing());
      expect(result).toBe(true);
    });

    it("should return false if the Maybe is a Just", () => {
      const result = isNothing(just(5));
      expect(result).toBe(false);
    });
  });

  describe("map", () => {
    it("should apply the function to the value if it is a Just", () => {
      const result = map((x: number) => x * 2, just(5));
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(10);
    });

    it("should return Nothing if it is a Nothing", () => {
      const result = map((x: number) => x * 2, nothing<number>());
      expect(result.isNothing()).toBe(true);
    });

    it("should work in curried form", () => {
      const double = map((x: number) => x * 2);
      const result = double(just(5));
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(10);
    });
  });

  describe("andThen", () => {
    it("should apply the function to the value if it is a Just", () => {
      const result = andThen((x: number) => just(x * 2), just(5));
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(10);
    });

    it("should return Nothing if the function returns Nothing", () => {
      const result = andThen((x: number) => nothing<number>(), just(5));
      expect(result.isNothing()).toBe(true);
    });

    it("should return Nothing if it is a Nothing", () => {
      const result = andThen((x: number) => just(x * 2), nothing<number>());
      expect(result.isNothing()).toBe(true);
    });

    it("should work in curried form", () => {
      const double = andThen((x: number) => just(x * 2));
      const result = double(just(5));
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(10);
    });
  });

  describe("getOrElseValue", () => {
    it("should return the value if it is a Just", () => {
      const result = getOrElseValue(10, just(5));
      expect(result).toBe(5);
    });

    it("should return the default value if it is a Nothing", () => {
      const result = getOrElseValue(10, nothing<number>());
      expect(result).toBe(10);
    });

    it("should work in curried form", () => {
      const defaultValue = getOrElseValue(10);
      const result = defaultValue(just(5));
      expect(result).toBe(5);
    });
  });

  describe("getOrElse", () => {
    it("should return the value if it is a Just", () => {
      const result = getOrElse(() => 10, just(5));
      expect(result).toBe(5);
    });

    it("should return the result of the function if it is a Nothing", () => {
      const result = getOrElse(() => 10, nothing<number>());
      expect(result).toBe(10);
    });

    it("should work in curried form", () => {
      const defaultFn = getOrElse(() => 10);
      const result = defaultFn(just(5));
      expect(result).toBe(5);
    });
  });

  describe("cata", () => {
    it("should call the Just function if it is a Just", () => {
      const result = cata(
        {
          Just: (x: number) => x * 2,
          Nothing: () => 10,
        },
        just(5)
      );
      expect(result).toBe(10);
    });

    it("should call the Nothing function if it is a Nothing", () => {
      const result = cata(
        {
          Just: (x: number) => x * 2,
          Nothing: () => 10,
        },
        nothing<number>()
      );
      expect(result).toBe(10);
    });

    it("should work in curried form", () => {
      const matcher = {
        Just: (x: number) => x * 2,
        Nothing: () => 10,
      };
      const cataFn = cata(matcher);
      const result = cataFn(just(5));
      expect(result).toBe(10);
    });
  });

  describe("sequence", () => {
    it("should return Just with an array of values if all Maybes are Just", () => {
      const maybes: Maybe<number>[] = [just(1), just(2), just(3)];
      const result = sequence(maybes);
      expect(result.isJust()).toBe(true);
      expect(result.state).toEqual([1, 2, 3]);
    });

    it("should return Nothing if any Maybe is Nothing", () => {
      const maybes: Maybe<number>[] = [just(1), nothing(), just(3)];
      const result = sequence(maybes);
      expect(result.isNothing()).toBe(true);
    });

    it("should return Just with an empty array if the input array is empty", () => {
      const maybes: Maybe<number>[] = [];
      const result = sequence(maybes);
      expect(result.isJust()).toBe(true);
      expect(result.state).toEqual([]);
    });
  });

  describe("traverse", () => {
    it("should return Just with an array of mapped values if all mappings return Just", () => {
      const numbers: number[] = [1, 2, 3];
      const result = traverse((n) => just(n.toString()), numbers);
      expect(result.isJust()).toBe(true);
      expect(result.state).toEqual(["1", "2", "3"]);
    });

    it("should return Nothing if any mapping returns Nothing", () => {
      const numbers: number[] = [1, 2, 3];
      const result = traverse(
        (n) => (n % 2 === 0 ? just(n.toString()) : nothing()),
        numbers
      );
      expect(result.isNothing()).toBe(true);
    });

    it("should return Just with an empty array if the input array is empty", () => {
      const numbers: number[] = [];
      const result = traverse((n) => just(n.toString()), numbers);
      expect(result.isJust()).toBe(true);
      expect(result.state).toEqual([]);
    });

    it("should work in curried form", () => {
      const toStringMaybe = traverse((n: number) => just(n.toString()));
      const numbers: number[] = [1, 2, 3];
      const result = toStringMaybe(numbers);
      expect(result.isJust()).toBe(true);
      expect(result.state).toEqual(["1", "2", "3"]);
    });

    it("should return Nothing in curried form if any mapping returns Nothing", () => {
      const toStringMaybe = traverse((n: number) =>
        n % 2 === 0 ? just(n.toString()) : nothing()
      );
      const numbers: number[] = [1, 2, 3];
      const result = toStringMaybe(numbers);
      expect(result.isNothing()).toBe(true);
    });
  });
});
