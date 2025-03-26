import Maybe, { just, nothing, maybe } from "../src/Maybe";
import { describe, it, expect } from "bun:test";

describe("Maybe", () => {
  describe("just", () => {
    it("should create a Maybe with the given value", () => {
      const result = just(5);
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(5);
    });
  });

  describe("nothing", () => {
    it("should create a Maybe with a null state", () => {
      const result = nothing();
      expect(result.isNothing()).toBe(true);
      expect(result.state).toBe(null);
    });
  });

  describe("maybe", () => {
    it("should create a Maybe with the given value", () => {
      const result = maybe(5);
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(5);
    });

    it("should create a Maybe with a null state if given null", () => {
      const result = maybe(null);
      expect(result.isNothing()).toBe(true);
      expect(result.state).toBe(null);
    });
  });

  describe("getOrElse", () => {
    it("should return the value if it is a Just", () => {
      const result = just(5).getOrElse(() => 10);
      expect(result).toBe(5);
    });

    it("should return the result of the function if it is a Nothing", () => {
      const result = nothing<number>().getOrElse(() => 10);
      expect(result).toBe(10);
    });
  });

  describe("getOrElseValue", () => {
    it("should return the value if it is a Just", () => {
      const result = just(5).getOrElseValue(10);
      expect(result).toBe(5);
    });

    it("should return the default value if it is a Nothing", () => {
      const result = nothing<number>().getOrElseValue(10);
      expect(result).toBe(10);
    });
  });

  describe("map", () => {
    it("should apply the function to the value if it is a Just", () => {
      const result = just(5).map((x) => x * 2);
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(10);
    });

    it("should return Nothing if it is a Nothing", () => {
      const result = nothing<number>().map((x) => x * 2);
      expect(result.isNothing()).toBe(true);
    });
  });

  describe("and", () => {
    it("should apply the function to the value if it is a Just", () => {
      const result = just(5).and((x) => x * 2);
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(10);
    });

    it("should return Nothing if it is a Nothing", () => {
      const result = nothing<number>().and((x) => x * 2);
      expect(result.isNothing()).toBe(true);
    });
  });

  describe("andThen", () => {
    it("should apply the function to the value if it is a Just", () => {
      const result = just(5).andThen((x) => just(x * 2));
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(10);
    });

    it("should return Nothing if the function returns Nothing", () => {
      const result = just(5).andThen(() => nothing<number>());
      expect(result.isNothing()).toBe(true);
    });

    it("should return Nothing if it is a Nothing", () => {
      const result = nothing<number>().andThen((x) => just(x * 2));
      expect(result.isNothing()).toBe(true);
    });
  });

  describe("orElse", () => {
    it("should return the Maybe if it is a Just", () => {
      const result = just(5).orElse(() => just(10));
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(5);
    });

    it("should return the result of the function if it is a Nothing", () => {
      const result = nothing<number>().orElse(() => just(10));
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(10);
    });
    it("should return nothing if the function returns nothing", () => {
      const result = nothing<number>().orElse(() => nothing());
      expect(result.isNothing()).toBe(true);
    });
  });

  describe("cata", () => {
    it("should call the Just function if it is a Just", () => {
      const result = just(5).cata({
        Just: (x) => x * 2,
        Nothing: () => 10,
      });
      expect(result).toBe(10);
    });

    it("should call the Nothing function if it is a Nothing", () => {
      const result = nothing<number>().cata({
        Just: (x) => x * 2,
        Nothing: () => 10,
      });
      expect(result).toBe(10);
    });
  });

  describe("assign", () => {
    it("should assign the value to the key if both are Just", () => {
      const result = just({}).assign("foo", just(5));
      expect(result.isJust()).toBe(true);
      expect(result.state).toEqual({ foo: 5 });
    });

    it("should assign the value from a function to the key if both are Just", () => {
      const result = just({}).assign("foo", (x) => just(5));
      expect(result.isJust()).toBe(true);
      expect(result.state).toEqual({ foo: 5 });
    });

    it("should return Nothing if the first is Nothing", () => {
      const result = nothing<object>().assign("foo", just(5));
      expect(result.isNothing()).toBe(true);
    });

    it("should return Nothing if the second is Nothing", () => {
      const result = just({}).assign("foo", nothing<{}>());
      expect(result.isNothing()).toBe(true);
    });
    it("should return Nothing if the function returns nothing", () => {
      const result = just({}).assign("foo", (x) => nothing<{}>());
      expect(result.isNothing()).toBe(true);
    });

    it("should merge multiple assigns", () => {
      const result = just({})
        .assign("foo", just(5))
        .assign("bar", just("hello"));
      expect(result.isJust()).toBe(true);
      expect(result.state).toEqual({ foo: 5, bar: "hello" });
    });
  });

  describe("do", () => {
    it("should call the function if it is a Just", () => {
      let called = false;
      just(5).do((x) => {
        called = true;
        expect(x).toBe(5);
      });
      expect(called).toBe(true);
    });

    it("should not call the function if it is a Nothing", () => {
      let called = false;
      nothing<number>().do((x) => {
        called = true;
      });
      expect(called).toBe(false);
    });

    it("should return the original Maybe", () => {
      const result = just(5).do(() => {});
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(5);

      const result2 = nothing<number>().do(() => {});
      expect(result2.isNothing()).toBe(true);
    });
  });

  describe("elseDo", () => {
    it("should call the function if it is a Nothing", () => {
      let called = false;
      nothing<number>().elseDo(() => {
        called = true;
      });
      expect(called).toBe(true);
    });

    it("should not call the function if it is a Just", () => {
      let called = false;
      just(5).elseDo(() => {
        called = true;
      });
      expect(called).toBe(false);
    });

    it("should return the original Maybe", () => {
      const result = just(5).elseDo(() => {});
      expect(result.isJust()).toBe(true);
      expect(result.state).toBe(5);

      const result2 = nothing<number>().elseDo(() => {});
      expect(result2.isNothing()).toBe(true);
    });
  });

  describe("isJust", () => {
    it("should return true if it is a Just", () => {
      expect(just(5).isJust()).toBe(true);
    });

    it("should return false if it is a Nothing", () => {
      expect(nothing().isJust()).toBe(false);
    });
  });

  describe("isNothing", () => {
    it("should return true if it is a Nothing", () => {
      expect(nothing().isNothing()).toBe(true);
    });

    it("should return false if it is a Just", () => {
      expect(just(5).isNothing()).toBe(false);
    });
  });
});
