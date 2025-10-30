import { v4 as uuidv4 } from "uuid";
import type { UserDocType } from "../model/types";
import type { AppDatabase } from "@/shared/db/db.types";
import { getDatabase } from "@/shared/db/db.config";

let userRepositoryInstance: UserRepository | null = null;

export class UserRepository {
  private readonly db: AppDatabase;

  constructor(db: AppDatabase) {
    this.db = db;
  }

  createUser(userData: Pick<UserDocType, "name">) {
    const now = new Date().toISOString();
    const userDocData: UserDocType = {
      id: uuidv4(),
      name: userData.name,
      createdAt: now,
      updatedAt: now,
    };

    return this.db.users.insert(userDocData);
  }

  getUserByName(name: string) {
    return this.db.users.findOne({ selector: { name } }).exec();
  }
}

export const getUserRepository = async () => {
  if (userRepositoryInstance) {
    return userRepositoryInstance;
  }

  const db = await getDatabase();

  userRepositoryInstance = new UserRepository(db);
  return userRepositoryInstance;
};
