import * as Yup from "yup";

export type YupObjectStrictSchema<T> = {
  [K in keyof Required<T>]: Yup.Schema<T[K]>;
};
