import type { RxDocument, RxCollection } from "rxdb";

export interface PinPosition {
  x: number;
  y: number;
}

export type TaskStatus =
  | "notStarted"
  | "inProgress"
  | "blocked"
  | "finalCheckAwaiting"
  | "done";

export interface ChecklistItem {
  id: string;
  text: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Checklist {
  title: string;
  items: ChecklistItem[];
}

export interface Task {
  id: string;
  name: string;
  overallStatus: TaskStatus;
  pinPosition: PinPosition;
  checklist: Checklist;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskData {
  name: string;
  pinPosition: PinPosition;
  overallStatus: TaskStatus;
  checklist?: Checklist;
}

export interface UpdateTaskData {
  name?: string;
  overallStatus?: TaskStatus;
  pinPosition?: PinPosition;
  checklist?: Checklist;
}

export interface ChecklistItemDocType {
  id: string;
  text: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistDocType {
  title: string;
  items: ChecklistItemDocType[];
}

export interface TaskDocType {
  id: string;
  name: string;
  overallStatus: TaskStatus;
  pinPosition: PinPosition;
  checklist: ChecklistDocType;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskDocument = RxDocument<TaskDocType>;
export type TaskCollection = RxCollection<TaskDocType>;
