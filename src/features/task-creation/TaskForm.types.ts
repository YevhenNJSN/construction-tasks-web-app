import type { Task, TaskStatus, Checklist, PinPosition } from "@/entities/task";

export interface TaskFormData {
  name: string;
  overallStatus: TaskStatus;
  checklist: Checklist;
}

export interface TaskFormProps {
  task?: Task;
  pinPosition?: PinPosition;
  onSubmit: (data: TaskFormData & { pinPosition?: PinPosition }) => void;
  onCancel: () => void;
  onFormChange?: (name: string, status: TaskStatus) => void;
  isLoading?: boolean;
}
