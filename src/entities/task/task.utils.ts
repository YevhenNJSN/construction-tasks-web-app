import type {
  Task,
  TaskDocType,
  ChecklistItem,
  ChecklistItemDocType,
  Checklist,
  ChecklistDocType,
  TaskStatus,
} from "./model/types";
import { TASK_STATUS } from "@/shared/lib/statusMaps";

export const computeOverallStatus = (items: ChecklistItem[]): TaskStatus => {
  if (!items || items.length === 0) {
    return TASK_STATUS.notStarted;
  }

  const statuses = items.map((item) => item.status);

  if (statuses.some((status) => status === TASK_STATUS.blocked)) {
    return TASK_STATUS.blocked;
  }

  if (statuses.every((status) => status === TASK_STATUS.done)) {
    return TASK_STATUS.done;
  }

  if (statuses.some((status) => status === TASK_STATUS.inProgress)) {
    return TASK_STATUS.inProgress;
  }

  if (statuses.some((status) => status === TASK_STATUS.finalCheckAwaiting)) {
    return TASK_STATUS.finalCheckAwaiting;
  }

  return TASK_STATUS.notStarted;
};

export const mapChecklistItemDocToChecklistItem = (
  doc: ChecklistItemDocType
): ChecklistItem => ({
  id: doc.id,
  text: doc.text,
  status: doc.status,
  createdAt: new Date(doc.createdAt),
  updatedAt: new Date(doc.updatedAt),
});

export const mapChecklistDocToChecklist = (
  doc: ChecklistDocType
): Checklist => ({
  title: doc.title,
  items: doc.items.map(mapChecklistItemDocToChecklistItem),
});

export const mapTaskDocumentToTask = (doc: TaskDocType): Task => ({
  id: doc.id,
  name: doc.name,
  overallStatus: doc.overallStatus,
  pinPosition: doc.pinPosition,
  checklist: mapChecklistDocToChecklist(doc.checklist),
  userId: doc.userId,
  createdAt: new Date(doc.createdAt),
  updatedAt: new Date(doc.updatedAt),
});
