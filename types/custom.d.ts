type KunNullable<T> = {
  [P in keyof T]: T[P] | null
}
