import type { UserCollection } from "@/entities/user";
import type { TaskCollection } from "@/entities/task/model/types";
import type { RxDatabase } from "rxdb";

export interface DatabaseCollections {
  users: UserCollection;
  tasks: TaskCollection;
}

export type AppDatabase = RxDatabase<DatabaseCollections>;
