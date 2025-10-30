import { useRef, useCallback, memo } from "react";
import type { Task, PinPosition } from "@/entities/task";
import { TASK_STATUS } from "@/shared/lib/statusMaps";
import { TaskPin } from "./TaskPin";
import planImage from "@/assets/plan.png";
import { ErrorBoundary } from "@/shared/ui";

interface FloorPlanProps {
  tasks: Task[];
  currentPin?: PinPosition | null;
  currentTaskName?: string;
  currentTaskStatus?: Task["overallStatus"];
  onPinClick?: (position: PinPosition) => void;
  onTaskPinClick?: (task: Task) => void;
}

const FloorPlanComponent = ({
  tasks,
  currentPin,
  currentTaskName = "",
  currentTaskStatus = TASK_STATUS.notStarted,
  onPinClick,
  onTaskPinClick,
}: FloorPlanProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlanClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !onPinClick) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      onPinClick({ x, y });
    },
    [onPinClick]
  );

  return (
    <ErrorBoundary level="feature">
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-gray-100 overflow-hidden cursor-crosshair"
        onClick={handlePlanClick}
        style={{
          backgroundImage: `url(${planImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {tasks.map((task) => (
          <TaskPin
            key={task.id}
            task={task}
            status={task.overallStatus}
            name={task.name}
            pinPosition={task.pinPosition}
            onTaskPinClick={onTaskPinClick}
          />
        ))}

        {currentPin && (
          <TaskPin
            status={currentTaskStatus}
            name={currentTaskName}
            pinPosition={currentPin}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export const FloorPlan = memo(FloorPlanComponent);
