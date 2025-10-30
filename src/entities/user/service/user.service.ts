import { getUserRepository } from "./../repository/user.repository";
import { mapDocumentToUser } from "../user.utils";

export async function getUserService() {
  const userRepository = await getUserRepository();

  return {
    async createUser(name: string) {
      if (!name) {
        throw new Error("Name is required to create a user");
      }
      const userDoc = await userRepository.createUser({ name });
      return mapDocumentToUser(userDoc);
    },

    async getUserByName(name: string) {
      if (!name) return null;

      const userDoc = await userRepository.getUserByName(name);
      return userDoc ? mapDocumentToUser(userDoc) : null;
    },
  };
}
