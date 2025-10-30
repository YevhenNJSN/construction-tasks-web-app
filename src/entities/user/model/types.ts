import type { RxDocument, RxCollection } from "rxdb";

export interface User {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  name: string;
}

export interface UserDocType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type UserDocument = RxDocument<UserDocType>;
export type UserCollection = RxCollection<UserDocType>;
