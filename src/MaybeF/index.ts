export interface Catamorphism<T, TResult> {
  nothing: () => TResult;
  just: (value: T) => TResult;
}

export type MaybeF<T> = NothingF<T> | JustF<T>;

export interface NothingF<T> {
  kind: 'nothing';
}

export interface JustF<T> {
  kind: 'just';
  value: T;
}

export const just = <T>(value: T): MaybeF<T> => ({
  kind: 'just',
  value,
});

export const nothing = <T>(): MaybeF<T> => ({ kind: 'nothing' });

export const cata = <T, TResult>(fold: Catamorphism<T, TResult>, m: MaybeF<T>): TResult => {
  switch (m.kind) {
    case 'nothing':
      return fold.nothing();
    case 'just':
      return fold.just(m.value);
  }
};

export const map = <T1, T2>(fn: (x: T1) => T2, mvar: MaybeF<T1>): MaybeF<T2> =>
  cata(
    {
      nothing: () => nothing<T2>(),
      just: x => just(fn(x)),
    },
    mvar,
  );

export const andThen = <T1, T2>(fn: (x: T1) => MaybeF<T2>, m: MaybeF<T1>): MaybeF<T2> =>
  cata(
    {
      nothing: () => nothing<T2>(),
      just: x => fn(x),
    },
    m,
  );

export const withDefault = <T>(defaultVal: T, m: MaybeF<T>): T =>
  cata(
    {
      nothing: () => defaultVal,
      just: x => x,
    },
    m,
  );

export const fromNullable = <T>(v: T | undefined | null): MaybeF<T> => {
  if (v == null) {
    return nothing<T>();
  }
  return just<T>(v);
};
