type ImmutablePrimitive = undefined | null | boolean | string | number | Function;

export type Immutable<T> = T extends ImmutablePrimitive ? T : ImmutableObject<T>;

export type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };
