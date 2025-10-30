import { useAuthStore } from "@/app/stores/authStore";
import { getUserService } from "@/entities/user/service/user.service";

export const useAuth = () => {
  const { user: userFromStore, setUser } = useAuthStore();

  const login = async (name: string) => {
    const userService = await getUserService();
    const userFromDb = await userService.getUserByName(name);
    if (userFromDb && userFromStore?.id === userFromDb.id) {
      return;
    }

    if (!userFromDb) {
      const newUser = await userService.createUser(name);
      setUser(newUser);
      return;
    }

    setUser(userFromDb);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user: userFromStore,
    login,
    logout,
  };
};
