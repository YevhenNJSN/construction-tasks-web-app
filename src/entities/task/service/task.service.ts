import { getTaskRepository } from "../repository/task.repository";
import { mapTaskDocumentToTask } from "../task.utils";
import type { CreateTaskData, UpdateTaskData } from "../model/types";
import { map } from "rxjs/operators";

export async function getTaskService(userId: string) {
  const taskRepository = await getTaskRepository();

  return {
    async createTask(taskData: CreateTaskData) {
      const taskDoc = await taskRepository.create(userId, taskData);
      return mapTaskDocumentToTask(taskDoc);
    },

    async getAllTasks() {
      const taskDocs = await taskRepository.findAll(userId);
      return taskDocs.map(mapTaskDocumentToTask);
    },

    getTasksObservable() {
      const observable = taskRepository.observeTasks(userId);
      return observable.pipe(
        map((taskDocs) => taskDocs.map(mapTaskDocumentToTask))
      );
    },

    async getTaskById(taskId: string) {
      if (!taskId) return null;

      const taskDoc = await taskRepository.findByTaskId(userId, taskId);
      return taskDoc ? mapTaskDocumentToTask(taskDoc) : null;
    },

    async updateTask(taskId: string, updates: UpdateTaskData) {
      const taskDoc = await taskRepository.update(userId, taskId, updates);
      return mapTaskDocumentToTask(taskDoc);
    },

    async deleteTask(taskId: string) {
      await taskRepository.delete(userId, taskId);
    },
  };
}
