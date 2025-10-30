import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/lib/routes";
import { useTasks } from "../plan/hooks/useTasks";
import { TaskList } from "@/features/task-list";
import { TaskFormModal, type TaskFormData } from "@/features/task-creation";
import type { Task } from "@/entities/task";
import { ErrorBoundary } from "@/shared/ui";

export const TasksView = () => {
  const { tasks, isLoading, error, updateTaskById, deleteTaskById } =
    useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const hasNoTasks = useMemo(() => tasks.length === 0, [tasks.length]);

  const handleTaskEdit = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);

  const handleTaskDelete = useCallback(
    async (taskId: string) => {
      await deleteTaskById(taskId);
    },
    [deleteTaskById]
  );

  const handleFormSubmit = useCallback(
    async (data: TaskFormData) => {
      if (!editingTask) return;

      await updateTaskById(editingTask.id, {
        name: data.name,
        overallStatus: data.overallStatus,
        checklist: data.checklist,
      });
      setEditingTask(null);
    },
    [editingTask, updateTaskById]
  );

  const handleFormCancel = useCallback(() => {
    setEditingTask(null);
  }, []);

  const handleFormDelete = useCallback(async () => {
    if (editingTask) {
      await deleteTaskById(editingTask.id);
      setEditingTask(null);
    }
  }, [editingTask, deleteTaskById]);

  return (
    <ErrorBoundary level="page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {error && (
          <div className="bg-red-100 border-grey-200 border rounded-lg p-4 mb-6">
            <p className="text-red-400 text-caption">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-h2 text-main mb-2">Tasks</h2>
            <p className="mt-1 text-gray-600">Manage your construction tasks</p>
          </div>

          <div className="p-6">
            {hasNoTasks ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No tasks created yet</p>
                <Link
                  to={ROUTES.PLAN}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Go to Floor Plan to Create Tasks
                </Link>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onTaskEdit={handleTaskEdit}
                onTaskDelete={handleTaskDelete}
              />
            )}
          </div>
        </div>

        <TaskFormModal
          isOpen={!!editingTask}
          task={editingTask || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          onDelete={editingTask ? handleFormDelete : undefined}
          isLoading={isLoading}
        />
      </div>
    </ErrorBoundary>
  );
};
