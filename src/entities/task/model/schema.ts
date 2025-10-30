import type { RxJsonSchema } from "rxdb";
import type { TaskDocType } from "./types";
import { TASK_STATUS_LIST } from "@/shared/lib/statusMaps";

export const taskSchema: RxJsonSchema<TaskDocType> = {
  title: "Task Schema",
  version: 0,
  description: "Task management schema for construction tasks",
  type: "object",
  primaryKey: "id",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
    },
    name: {
      type: "string",
      maxLength: 200,
    },
    overallStatus: {
      type: "string",
      maxLength: 20,
      enum: [...TASK_STATUS_LIST],
    },
    pinPosition: {
      type: "object",
      properties: {
        x: {
          type: "number",
        },
        y: {
          type: "number",
        },
      },
      required: ["x", "y"],
    },
    checklist: {
      type: "object",
      properties: {
        title: {
          type: "string",
          maxLength: 200,
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                maxLength: 36,
              },
              text: {
                type: "string",
                maxLength: 500,
              },
              status: {
                type: "string",
                enum: [...TASK_STATUS_LIST],
              },
              createdAt: {
                type: "string",
                format: "date-time",
                maxLength: 30,
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                maxLength: 30,
              },
            },
            required: ["id", "text", "status", "createdAt", "updatedAt"],
          },
        },
      },
      required: ["title", "items"],
    },
    userId: {
      type: "string",
      ref: "users",
      maxLength: 36,
    },
    createdAt: {
      type: "string",
      format: "date-time",
      maxLength: 30,
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      maxLength: 30,
    },
  },
  required: [
    "id",
    "name",
    "overallStatus",
    "pinPosition",
    "checklist",
    "userId",
    "createdAt",
    "updatedAt",
  ],
  indexes: ["userId", "overallStatus"],
};
