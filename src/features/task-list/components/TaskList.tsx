import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import type { Task } from "@/entities/task/model/types";
import { Button, ErrorBoundary } from "@/shared/ui";
import { Status } from "@/features/task-creation/Status";
import { ROUTES } from "@/shared/lib/routes";

interface TaskListProps {
  tasks: Task[];
  onTaskEdit?: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskListComponent = ({
  tasks,
  onTaskEdit,
  onTaskDelete,
}: TaskListProps) => {
  return (
    <ErrorBoundary level="feature">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-h2 text-main">Tasks</h3>
          <p className="text-caption text-secondary mt-1">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"} on this floor
            plan
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export const TaskList = memo(TaskListComponent);

interface TaskListItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskListItem = memo(({ task, onEdit, onDelete }: TaskListItemProps) => {
  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(task);
    }
  }, [onEdit, task]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [onDelete, task.id]);

  const handleTaskClick = useCallback(() => {
    navigate(ROUTES.PLAN);
  }, [navigate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleTaskClick();
      }
    },
    [handleTaskClick]
  );

  return (
    <div
      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      onClick={handleTaskClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View task ${task.name} on floor plan`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-body text-main truncate">{task.name}</h4>
            <Status status={task.overallStatus} />
          </div>
        </div>

        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
          {onEdit && (
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleEdit}
              className="flex-1"
              aria-label={`Edit task ${task.name}`}
            >
              Edit
            </Button>
          )}
          <Button
            type="button"
            color="error"
            onClick={handleDelete}
            className="flex-1"
            aria-label={`Delete task ${task.name}`}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
});
