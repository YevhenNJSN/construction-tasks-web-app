import type { RxJsonSchema } from "rxdb";
import type { UserDocType } from "./types";

export const userSchema: RxJsonSchema<UserDocType> = {
  title: "User Schema",
  version: 0,
  description: "User authentication schema",
  type: "object",
  primaryKey: "id",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
    },
    name: {
      type: "string",
      maxLength: 100,
    },
    createdAt: {
      type: "string",
      format: "date-time",
      maxLength: 30,
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
  },
  required: ["id", "name", "createdAt", "updatedAt"],
  indexes: ["name", "createdAt"],
};
