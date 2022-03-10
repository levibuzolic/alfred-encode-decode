// Fix type refinement when using `.filter(Boolean)`
// https://github.com/microsoft/TypeScript/issues/16655#issuecomment-797044678
type Falsy = false | 0 | "" | null | undefined;

interface Array<T> {
  filter<S extends T>(
    predicate: BooleanConstructor,
    thisArg?: any
  ): Exclude<S, Falsy>[];
}

interface ReadonlyArray<T> {
  filter<S extends T>(
    predicate: BooleanConstructor,
    thisArg?: any
  ): Exclude<S, Falsy>[];
}
