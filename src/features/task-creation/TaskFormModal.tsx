import type { Task, TaskStatus, Checklist, PinPosition } from "@/entities/task";
import { TaskForm } from "./TaskForm";
import { ErrorBoundary } from "@/shared/ui";

interface TaskFormData {
  name: string;
  overallStatus: TaskStatus;
  checklist: Checklist;
}

interface TaskFormModalProps {
  isOpen: boolean;
  task?: Task;
  pinPosition?: PinPosition;
  onSubmit: (data: TaskFormData & { pinPosition?: PinPosition }) => void;
  onCancel: () => void;
  onDelete?: () => void;
  onFormChange?: (name: string, status: TaskStatus) => void;
  isLoading?: boolean;
}

export const TaskFormModal = ({
  isOpen,
  task,
  pinPosition,
  onSubmit,
  onCancel,
  onDelete,
  onFormChange,
  isLoading = false,
}: TaskFormModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center no-doc-scroll p-4">
      <div className="absolute inset-0 backdrop-blur-xs" onClick={onCancel} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[470px] max-h-[90vh] flex flex-col">
        <div className="p-6 pb-4 flex-shrink-0 bg-blue-100 border-b border-blue-200 flex justify-between items-center">
          <h3 className="text-h2 text-custom-main">
            {task ? "Edit Task" : "Create Task"}
          </h3>
          {task && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              disabled={isLoading}
              className="text-custom-red-400 hover:text-custom-red-300 disabled:opacity-50 transition-colors p-1"
              title="Delete task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <ErrorBoundary level="feature">
            <TaskForm
              task={task}
              pinPosition={pinPosition}
              onSubmit={onSubmit}
              onCancel={onCancel}
              onFormChange={onFormChange}
              isLoading={isLoading}
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};
