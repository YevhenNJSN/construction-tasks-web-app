import type { Task } from "@/entities/task";
import { TASK_STATUS_PIN_COLORS } from "@/shared/lib/statusMaps";

interface TaskPinProps {
  task?: Task;
  status: Task["overallStatus"];
  name: string;
  pinPosition: Task["pinPosition"];
  onTaskPinClick?: (task: Task) => void;
}

export const TaskPin = ({
  task,
  status,
  name,
  pinPosition,
  onTaskPinClick,
}: TaskPinProps) => {
  const colorClass = TASK_STATUS_PIN_COLORS[status];

  const getInitials = (taskName: string): string => {
    const words = taskName.trim().split(/\s+/);
    if (words.length === 0) return "";
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const handlePinClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onTaskPinClick && task) {
      onTaskPinClick(task);
    }
  };

  return (
    <div
      className="absolute cursor-pointer hover:scale-110 transition-transform"
      style={{
        left: `${pinPosition.x}%`,
        top: `${pinPosition.y}%`,
        transform: "translate(-50%, -100%)",
      }}
      onClick={task && onTaskPinClick ? handlePinClick : undefined}
      title={name}
    >
      <svg width="47" height="63" viewBox="0 0 24 32">
        <path
          d="M12 0C5.373 0 0 5.373 0 12c0 6.627 12 20 12 20s12-13.373 12-20C24 5.373 18.627 0 12 0z"
          className={colorClass}
        />
        <text
          x="12"
          y="14"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="white"
        >
          {getInitials(name)}
        </text>
      </svg>
    </div>
  );
};
