import type { User, UserDocType } from ".";

export const mapDocumentToUser = (doc: UserDocType): User => ({
  id: doc.id,
  name: doc.name,
  createdAt: new Date(doc.createdAt),
  updatedAt: new Date(doc.updatedAt),
});
