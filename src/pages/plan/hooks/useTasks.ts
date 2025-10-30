import { useState, useEffect, useCallback } from "react";
import { getTaskService } from "@/entities/task";
import { useAuthContext } from "@/app/providers/auth/useAuthContext";
import type { CreateTaskData, UpdateTaskData, Task } from "@/entities/task";
import type { Subscription } from "rxjs";
import { handleError } from "@/shared/lib/errorHandling";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user?.id) return;

    let subscription: Subscription;

    const setupSubscription = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const taskService = await getTaskService(user.id);
        const taskObservable = await taskService.getTasksObservable();

        subscription = taskObservable.subscribe({
          next: (userTasks) => {
            setTasks(userTasks);
            setIsLoading(false);
          },
          error: (err) => {
            setError(
              handleError("useTasks:subscribe", err, "Failed to load tasks")
            );
            setIsLoading(false);
          },
        });
      } catch (err) {
        setError(handleError("useTasks:setup", err, "Failed to load tasks"));
        setIsLoading(false);
      }
    };

    setupSubscription();

    return () => {
      subscription?.unsubscribe();
    };
  }, [user?.id]);

  const createTask = useCallback(
    async (taskData: CreateTaskData) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      setIsLoading(true);
      setError(null);

      try {
        const taskService = await getTaskService(user.id);
        await taskService.createTask(taskData);
      } catch (err) {
        const errorMessage = handleError(
          "useTasks:create",
          err,
          "Failed to create task"
        );
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [user?.id]
  );

  const updateTaskById = useCallback(
    async (taskId: string, updates: UpdateTaskData) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      setIsLoading(true);
      setError(null);

      try {
        const taskService = await getTaskService(user.id);
        await taskService.updateTask(taskId, updates);
      } catch (err) {
        const errorMessage = handleError(
          "useTasks:update",
          err,
          "Failed to update task"
        );
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [user?.id]
  );

  const deleteTaskById = useCallback(
    async (taskId: string) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      setIsLoading(true);
      setError(null);

      try {
        const taskService = await getTaskService(user.id);
        await taskService.deleteTask(taskId);
      } catch (err) {
        const errorMessage = handleError(
          "useTasks:delete",
          err,
          "Failed to delete task"
        );
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [user?.id]
  );

  return {
    tasks,
    createTask,
    updateTaskById,
    deleteTaskById,
    isLoading,
    error,
  };
};
