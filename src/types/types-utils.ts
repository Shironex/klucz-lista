export type ReadonlyProps<t> = {
    readonly [k in keyof t]: t[k];
}