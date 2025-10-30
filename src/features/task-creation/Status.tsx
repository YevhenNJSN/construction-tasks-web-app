import type { TaskStatus as TaskStatusType } from "@/entities/task";
import {
  TASK_STATUS_LABELS,
  TASK_STATUS_DOT_COLORS,
} from "@/shared/lib/statusMaps";

interface TaskStatusProps {
  status: TaskStatusType;
  className?: string;
}

export const Status = ({ status, className = "" }: TaskStatusProps) => {
  const colorClass = TASK_STATUS_DOT_COLORS[status];
  const label = TASK_STATUS_LABELS[status];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`w-3 h-3 rounded-full ${colorClass}`}
        style={{ border: "1px solid rgba(0, 0, 0, 0.5)" }}
        aria-label={label}
      />
      <span className="text-caption text-custom-grey-600">
        {TASK_STATUS_LABELS[status]}
      </span>
    </div>
  );
};

export default Status;
