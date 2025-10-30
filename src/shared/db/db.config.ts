import { createRxDatabase, addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { userSchema } from "@/entities/user/model/schema";
import { taskSchema } from "@/entities/task/model/schema";
import { getRxStorageLocalstorage } from "rxdb/plugins/storage-localstorage";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import type { DatabaseCollections } from "./db.types";
import type { AppDatabase } from "./db.types";

const isDevMode = import.meta.env.MODE === "development";

addRxPlugin(RxDBUpdatePlugin);

if (isDevMode) {
  addRxPlugin(RxDBDevModePlugin);
}

let dbPromise: Promise<AppDatabase> | null = null;

export async function getDatabase(): Promise<AppDatabase> {
  if (!dbPromise) {
    dbPromise = createDatabase();
  }
  return dbPromise;
}

export const createDatabase = async () => {
  const baseStorage = getRxStorageLocalstorage();
  const storage = isDevMode
    ? wrappedValidateAjvStorage({ storage: baseStorage })
    : baseStorage;

  const db = await createRxDatabase<DatabaseCollections>({
    name: "construction_tasks_localstorage",
    storage: storage,
    ignoreDuplicate: false,
    multiInstance: false,
    eventReduce: true,
  });

  await db.addCollections({
    users: {
      schema: userSchema,
    },
    tasks: {
      schema: taskSchema,
    },
  });

  return db;
};
