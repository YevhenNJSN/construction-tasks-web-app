import { useState, useCallback, useMemo } from "react";
import { useTasks } from "./hooks/useTasks";
import { FloorPlan } from "@/features/floor-plan/FloorPlan";
import { TaskFormModal, type TaskFormData } from "@/features/task-creation";
import type { Task, TaskStatus, PinPosition } from "@/entities/task";
import { TASK_STATUS } from "@/shared/lib/statusMaps";
import { ErrorBoundary } from "@/shared/ui";

export const PlanView = () => {
  const {
    tasks,
    isLoading,
    error,
    createTask,
    updateTaskById,
    deleteTaskById,
  } = useTasks();
  const [pinPosition, setPinPosition] = useState<PinPosition | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentTaskName, setCurrentTaskName] = useState("");
  const [currentTaskStatus, setCurrentTaskStatus] = useState<TaskStatus>(
    TASK_STATUS.notStarted
  );

  const isModalOpen = useMemo(
    () => !!pinPosition || !!editingTask,
    [pinPosition, editingTask]
  );

  const handlePinClick = useCallback((position: PinPosition) => {
    setPinPosition(position);
    setEditingTask(null);
  }, []);

  const handleTaskPinClick = useCallback((task: Task) => {
    setEditingTask(task);
    setPinPosition(null);
  }, []);

  const handleUpdateTaskDetails = useCallback((name: string, status: TaskStatus) => {
    setCurrentTaskName(name);
    setCurrentTaskStatus(status);
  }, []);

  const handleFormSubmit = useCallback(
    async (data: TaskFormData & { pinPosition?: PinPosition }) => {
      if (editingTask) {
        await updateTaskById(editingTask.id, {
          name: data.name,
          overallStatus: data.overallStatus,
          checklist: data.checklist,
        });
        setEditingTask(null);
      } else if (pinPosition) {
        await createTask({
          name: data.name,
          pinPosition,
          overallStatus: data.overallStatus,
          checklist: data.checklist,
        });
        setPinPosition(null);
        setCurrentTaskName("");
        setCurrentTaskStatus(TASK_STATUS.notStarted);
      }
    },
    [editingTask, pinPosition, createTask, updateTaskById]
  );

  const handleFormCancel = useCallback(() => {
    setPinPosition(null);
    setEditingTask(null);
    setCurrentTaskName("");
    setCurrentTaskStatus(TASK_STATUS.notStarted);
  }, []);

  const handleDeleteTask = useCallback(async () => {
    if (editingTask) {
      await deleteTaskById(editingTask.id);
      setEditingTask(null);
      setCurrentTaskName("");
      setCurrentTaskStatus(TASK_STATUS.notStarted);
    }
  }, [editingTask, deleteTaskById]);

  return (
    <ErrorBoundary level="page">
      <div className="h-full relative">
        <div className="px-4 sm:px-6 lg:px-8 py-8 h-full">
          {error && (
            <div className="bg-red-100 border-grey-200 border rounded-lg p-4 mb-6">
              <p className="text-red-400 text-caption">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border-grey-200 p-6">
            <h2 className="text-h2 text-main mb-4">Floor Plan</h2>
            <FloorPlan
              tasks={tasks}
              currentPin={pinPosition}
              currentTaskName={currentTaskName}
              currentTaskStatus={currentTaskStatus}
              onPinClick={handlePinClick}
              onTaskPinClick={handleTaskPinClick}
            />
          </div>
        </div>

        <TaskFormModal
          isOpen={isModalOpen}
          task={editingTask || undefined}
          pinPosition={pinPosition || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          onDelete={editingTask ? handleDeleteTask : undefined}
          onFormChange={handleUpdateTaskDetails}
          isLoading={isLoading}
        />
      </div>
    </ErrorBoundary>
  );
};
