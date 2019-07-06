declare type MapIterator<T,U> =
  | ((item: T, index: number, array: Array<T>) => U)
    | propertyIterateeShorthand;

declare type NestedArray<T> = Array<Array<T>>;

declare type matchesIterateeShorthand = Object;
declare type matchesPropertyIterateeShorthand = [string, any];
declare type propertyIterateeShorthand = string;

declare type OPredicate<A, O> =
  | ((value: A, key: string, object: O) => any)
  | matchesIterateeShorthand
  | matchesPropertyIterateeShorthand
  | propertyIterateeShorthand;

declare type Predicate<T> =
  | ((value: T, index: number, array: Array<T>) => any)
  | matchesIterateeShorthand
  | matchesPropertyIterateeShorthand
  | propertyIterateeShorthand;

declare type OMapIterator<T,O,U> =
  | ((item: T, key: string, object: O) => U)
    | propertyIterateeShorthand;

declare module 'lodash/assign' {
  declare function assign(object?: ?Object, ...sources?: Array<Object>): Object;
  declare var exports: assign;
}

declare module 'lodash/get' {
  declare function get(object?: ?Object, path?: ?Array<string>|string, defaultValue?: any): any;
  declare var exports : typeof get;
}

declare module 'lodash/random' {
  declare function random(lower?: number, upper?: number, floating?: bool): number;
  declare var exports : typeof random;
}

declare module 'lodash/map' {
  declare function map<T, U>(array: ?Array<T>, iteratee?: MapIterator<T, U>): Array<U>;
  declare function map<V, T: Object, U>(object: ?T, iteratee?: OMapIterator<V, T, U>): Array<U>;
  declare function map(str: ?string, iteratee?: (char: string, index: number, str: string) => any): string;

  declare var exports: typeof map;
}

declare module 'lodash/omit' {
  declare function omit(object?: ?Object, ...props: Array<string>): Object;
  declare function omit(object?: ?Object, props: Array<string>): Object;

  declare var exports: typeof omit;
}

declare module 'lodash/pick' {
  declare function pick(object?: ?Object, ...props: Array<string>): Object;
  declare function pick(object?: ?Object, props: Array<string>): Object;
  declare var exports: typeof pick;
}

declare module 'lodash/partition' {
  declare function partition<T>(array: ?Array<T>, predicate?: Predicate<T>): NestedArray<T>;
  declare function partition<V, A, T: {[id: string]: A}>(object: T, predicate?: OPredicate<A, T>): NestedArray<V>;
  declare var exports: typeof partition;
}

declare module 'lodash/values' {
  declare function values(object?: ?Object): Array<any>;
  declare var exports: typeof values;
}
