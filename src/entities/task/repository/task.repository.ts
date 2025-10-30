import { v4 as uuidv4 } from "uuid";
import type {
  TaskDocType,
  CreateTaskData,
  UpdateTaskData,
} from "../model/types";
import type { AppDatabase } from "@/shared/db/db.types";
import { getDatabase } from "@/shared/db/db.config";

let taskRepositoryInstance: TaskRepository | null = null;

export class TaskRepository {
  private readonly db: AppDatabase;

  constructor(db: AppDatabase) {
    this.db = db;
  }

  async create(userId: string, taskData: CreateTaskData) {
    const now = new Date().toISOString();
    const taskDocData: TaskDocType = {
      id: uuidv4(),
      name: taskData.name,
      overallStatus: taskData.overallStatus,
      pinPosition: taskData.pinPosition,
      checklist: taskData.checklist
        ? {
            title: taskData.checklist.title,
            items: taskData.checklist.items
              .filter((item) => item.text.trim().length > 0)
              .map((item) => ({
                id: item.id,
                text: item.text,
                status: item.status,
                createdAt: item.createdAt.toISOString(),
                updatedAt: item.updatedAt.toISOString(),
              })),
          }
        : { title: "", items: [] },
      userId: userId,
      createdAt: now,
      updatedAt: now,
    };

    return this.db.tasks.insert(taskDocData);
  }

  findByTaskId(userId: string, taskId: string) {
    return this.db.tasks
      .findOne({ selector: { id: taskId, userId: userId } })
      .exec();
  }

  findAll(userId: string) {
    return this.db.tasks.find({ selector: { userId: userId } }).exec();
  }

  observeTasks(userId: string) {
    return this.db.tasks.find({ selector: { userId: userId } }).$;
  }

  async update(userId: string, taskId: string, updates: UpdateTaskData) {
    const task = await this.findByTaskId(userId, taskId);
    if (!task) {
      throw new Error(`Task with id ${taskId} not found for user`);
    }

    const updatedData: Record<string, unknown> = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.checklist) {
      updatedData.checklist = {
        title: updates.checklist.title,
        items: updates.checklist.items
          .filter((item) => item.text.trim().length > 0)
          .map((item) => ({
            id: item.id,
            text: item.text,
            status: item.status,
            createdAt:
              typeof item.createdAt === "string"
                ? item.createdAt
                : item.createdAt.toISOString(),
            updatedAt:
              typeof item.updatedAt === "string"
                ? item.updatedAt
                : item.updatedAt.toISOString(),
          })),
      };
    }

    return task.update({ $set: updatedData });
  }

  async delete(userId: string, taskId: string) {
    const task = await this.findByTaskId(userId, taskId);
    if (!task) {
      throw new Error(`Task with id ${taskId} not found for user`);
    }

    return task.remove();
  }
}

export const getTaskRepository = async () => {
  if (taskRepositoryInstance) {
    return taskRepositoryInstance;
  }

  const db = await getDatabase();
  taskRepositoryInstance = new TaskRepository(db);

  return taskRepositoryInstance;
};
