# Maybeasy: Embracing Optionality in TypeScript

`maybeasy` is a lightweight and powerful TypeScript library for working with optional values using the `Maybe` monad. It provides a type-safe and functional approach to handling situations where a value might be present (`Just`) or absent (`Nothing`), helping you avoid runtime errors and write more robust code.

## The Problem: The Perils of `null` and `undefined`

In JavaScript, `null` and `undefined` are often used to represent the absence of a value. However, this can lead to runtime errors when you forget to check for these values, resulting in the dreaded "Cannot read property 'x' of null" error.

TypeScript's strict null checking helps, but it can also lead to verbose and repetitive code as you're forced to check for `null` or `undefined` everywhere.

## The Solution: The `Maybe` Monad

`maybeasy` offers a better way: the `Maybe` type. A `Maybe` value can be in one of two states:

- **`Just(value)`:** Represents the presence of a value.
- **`Nothing()`:** Represents the absence of a value.

By using `Maybe`, you can explicitly model optionality in your code and leverage a set of powerful functions to work with these values safely and elegantly.

## Key Concepts

### 1. The Functor: Mapping Over `Maybe`

The `map` method allows you to apply a function to the value inside a `Maybe` if it's `Just`. If the `Maybe` is `Nothing`, `map` does nothing and returns `Nothing`.

```typescript
import { just, nothing, Maybe } from "maybeasy";

const fetchSomething = (): Maybe<number> => {
  // ... some computation that might return a number or nothing
  return just(5);
};

const add2 = (n: number) => n + 2;

const result = fetchSomething().map(add2); // result is just(7)

const result2 = nothing<number>().map(add2); // result2 is nothing()
```

### 2. Monadic Chaining: andThen

When you have a computation that depends on the result of another computation, and both might return Nothing, you need andThen. andThen is like map, but it expects the function to return a Maybe. This prevents nested Maybe values (Maybe<Maybe<T>>).

```typescript
import { just, nothing, Maybe } from "maybeasy";

const fetchSomething = (): Maybe<number> => just(5);

const fetchSomethingElse = (n: number): Maybe<string> => {
  // ... some computation that might return a string or nothing
  return just(`The number is ${n}`);
};

const result = fetchSomething().andThen(fetchSomethingElse); // result is just("The number is 5")

const result2 = nothing<number>().andThen(fetchSomethingElse); // result2 is nothing()

const result3 = just(5).andThen((n) => nothing<string>()); // result3 is nothing()
```

### 3. Building Objects: `assign`

The assign method helps you build up an object from a series of Maybe values. It's a cleaner alternative to deeply nested andThen calls.

```typescript
import { just, nothing } from "maybeasy";

const fetchA = (): Maybe<number> => just(1);
const fetchB = (): Maybe<string> => just("hello");
const fetchC = (n: number): Maybe<number> => just(n + 10);

const result = just({})
  .assign("a", fetchA())
  .assign("b", fetchB())
  .assign("c", (scope) => fetchC(scope.a)); // result is just({ a: 1, b: "hello", c: 11 })

const result2 = just({}).assign("a", nothing()).assign("b", fetchB()); // result2 is nothing()
```

### 4. Unwrapping: getOrElse and getOrElseValue

At some point, you'll need to extract the value from a Maybe. getOrElse and getOrElseValue provide safe ways to do this, requiring you to provide a fallback value in case the Maybe is Nothing.

- **getOrElseValue(defaultValue)**: Takes a default value of the same type as the Maybe.
- **getOrElse(fn)**: Takes a function that returns a default value. This is useful when the default value is expensive to compute, as the function will only be called if the Maybe is Nothing.

```typescript
import { just, nothing } from "maybeasy";

const maybeNumber = just(5);
const number = maybeNumber.getOrElseValue(10); // number is 5

const nothingMaybe = nothing<number>();
const defaultNumber = nothingMaybe.getOrElse(() => {
  // ... some expensive computation to get a default value
  return 10;
}); // defaultNumber is 10
```

### 5. Filtering: `filter`

The filter method allows you to conditionally keep or discard a value within a Maybe chain based on a predicate function.

```typescript
import { just, nothing } from "maybeasy";

const maybeNumber = just(5);
const filteredMaybe = maybeNumber.filter((x) => x > 3); // filteredMaybe is just(5)

const filteredMaybe2 = maybeNumber.filter((x) => x > 10); // filteredMaybe2 is nothing()

const nothingMaybe = nothing<number>();
const filteredNothing = nothingMaybe.filter((x) => x > 3); // filteredNothing is nothing()
```

### 6. Checking for Existence: `exists`

The exists method allows you to check if a value within a Maybe meets a certain condition without unwrapping it.

```typescript
import { just, nothing } from "maybeasy";

const maybeNumber = just(5);
const exists = maybeNumber.exists((x) => x > 3); // exists is true

const exists2 = maybeNumber.exists((x) => x > 10); // exists2 is false

const nothingMaybe = nothing<number>();
const exists3 = nothingMaybe.exists((x) => x > 3); // exists3 is false
```

### 7. Applying Functions: ap

The ap method allows you to apply a Maybe containing a function to a Maybe containing a value. This is useful for working with functions that take multiple arguments, where each argument might be optional.

```typescript
import { just, nothing, Maybe } from "maybeasy";

const maybeAdd: Maybe<(x: number) => number> = just((x: number) => x + 1);
const maybeNumber: Maybe<number> = just(5);
const result: Maybe<number> = maybeNumber.ap(maybeAdd); // result is just(6)

const nothingMaybe: Maybe<(x: number) => number> = nothing();
const result2: Maybe<number> = maybeNumber.ap(nothingMaybe); // result2 is nothing()

const nothingMaybe2: Maybe<number> = nothing();
const result3: Maybe<number> = nothingMaybe2.ap(maybeAdd); // result3 is nothing()
```

### 8. Working with Collections: `sequence` and `traverse`

- **sequence**: Takes an array of Maybe<T> and returns a Maybe<T[]>. If all the Maybe values in the array are Just, it returns a Just containing an array of the unwrapped values. If any are Nothing, it returns Nothing.
- **traverse**: Similar to sequence, but it takes an array of values and a function that maps each value to a Maybe. It then returns a Maybe containing an array of the unwrapped values (if all were Just) or Nothing (if any were Nothing).

```typescript
import { just, nothing, sequence, traverse, Maybe } from "maybeasy";

const maybes: Maybe<number>[] = [just(1), just(2), just(3)];
const result: Maybe<number[]> = sequence(maybes); // result is just([1, 2, 3])

const maybes2: Maybe<number>[] = [just(1), nothing(), just(3)];
const result2: Maybe<number[]> = sequence(maybes2); // result2 is nothing()

const numbers: number[] = [1, 2, 3];
const result3: Maybe<string[]> = traverse((n) => just(n.toString()), numbers); // result3 is just(["1", "2", "3"])

const numbers2: number[] = [1, 2, 3];
const result4: Maybe<string[]> = traverse(
  (n) => (n % 2 === 0 ? just(n.toString()) : nothing()),
  numbers2
); // result4 is nothing()
```

### 9. Side Effects: `do` and `elseDo`

- **do**: Inject a side-effectual operation into a chain of maybe operations. The side effect only runs when there is a value (Just).
- **elseDo**: Inject a side-effectual operation into a chain of maybe operations. The side effect only runs when there is not a value (Nothing).

```typescript
import { just, nothing } from "maybeasy";

just(5).do((x) => console.log(`The value is ${x}`)); // Logs "The value is 5"
nothing().do((x) => console.log(`The value is ${x}`)); // Does not log anything

nothing().elseDo(() => console.log("There is nothing here")); // Logs "There is nothing here"
just(5).elseDo(() => console.log("There is nothing here")); // Does not log anything
```

## Installation

```bash
npm install maybeasy
# or
yarn add maybeasy
```

## Usage

```typescript
import { just, nothing, Maybe } from "maybeasy";

function parse(s: string): Maybe<object> {
  try {
    return just(JSON.parse(s));
  } catch (e) {
    return nothing();
  }
}

const result = parse('{"key": "value"}')
  .map((obj) => obj.key)
  .getOrElseValue("default"); // result is "value"
const result2 = parse("not json")
  .map((obj) => obj.key)
  .getOrElseValue("default"); // result2 is "default"
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

MIT
