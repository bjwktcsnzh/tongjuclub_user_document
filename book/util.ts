export type WithFlag<FlagName extends string> = {} & Record<FlagName, string>;
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type PathdTreeNode<
  FlagPath extends string,
  T extends WithFlag<FlagPath>,
  FlagPropName extends string,
  FlagPropItems extends string,
  FlagPropValue extends string
> = Record<FlagPropName, string> &
  Record<
    FlagPropItems,
    PathdTreeNode<FlagPath, T, FlagPropName, FlagPropItems, FlagPropValue>[]
  > &
  PartialRecord<FlagPropValue, T>;

export function array_pathd_to_tree<
  FlagPropPath extends string,
  FlagPropName extends string,
  FlagPropItems extends string,
  FlagPropValue extends string,
  T extends WithFlag<FlagPropPath>
>(
  params: T[],
  flags: Record<"path", FlagPropPath> &
    Record<"name", FlagPropName> &
    Record<"items", FlagPropItems> &
    Record<"value", FlagPropValue>,
  hooks: {
    onCreateMapping: (
      n: PathdTreeNode<
        FlagPropPath,
        T,
        FlagPropName,
        FlagPropItems,
        FlagPropValue
      >
    ) => PathdTreeNode<
      FlagPropPath,
      T,
      FlagPropName,
      FlagPropItems,
      FlagPropValue
    >;
    afterMountValue: (
      n: PathdTreeNode<
        FlagPropPath,
        T,
        FlagPropName,
        FlagPropItems,
        FlagPropValue
      >
    ) => void;
  } = {
    onCreateMapping: (it) => it,
    afterMountValue() {},
  }
): PathdTreeNode<
  FlagPropPath,
  T,
  FlagPropName,
  FlagPropItems,
  FlagPropValue
>[] {
  type _Node = PathdTreeNode<
    FlagPropPath,
    T,
    FlagPropName,
    FlagPropItems,
    FlagPropValue
  >;

  const root = {
    [flags.items]: [],
  } as _Node;

  for (const param of params) {
    let node = root;
    for (const p of param[flags.path].split("/")) {
      const exist = node[flags.items].find((it) => it[flags.name] == p);
      if (exist) {
        node = exist;
        continue;
      } else {
        let next = {
          [flags.name]: p,
          [flags.items]: [],
        } as _Node;
        next = hooks.onCreateMapping(next);
        node[flags.items].push(next);
        node = next;
      }
    }
    node[flags.value] = param as any; // TODO: How not to use `as any` ...
    hooks.afterMountValue(node);
  }

  return root[flags.items];
}

// default argument
export function array_pathd_to_tree_0<T extends WithFlag<"path">>(params: T[]) {
  return array_pathd_to_tree(params, {
    path: "path",
    name: "name",
    items: "items",
    value: "value",
  });
}

