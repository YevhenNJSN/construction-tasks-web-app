import defaultIcon from "@/assets/icons/default.svg";
import runningIcon from "@/assets/icons/running.svg";
import blockedIcon from "@/assets/icons/blocked.svg";
import finalCheckIcon from "@/assets/icons/finalCheckAwaiting.svg";
import successIcon from "@/assets/icons/success.svg";

export const TASK_STATUS = {
  notStarted: "notStarted",
  inProgress: "inProgress",
  blocked: "blocked",
  finalCheckAwaiting: "finalCheckAwaiting",
  done: "done",
} as const;

export const TASK_STATUS_LIST = [
  TASK_STATUS.notStarted,
  TASK_STATUS.inProgress,
  TASK_STATUS.blocked,
  TASK_STATUS.finalCheckAwaiting,
  TASK_STATUS.done,
] as const;

export const TASK_STATUS_PIN_COLORS = {
  notStarted: "fill-custom-grey-400",
  inProgress: "fill-custom-yellow-400",
  blocked: "fill-custom-red-300",
  finalCheckAwaiting: "fill-custom-blue-400",
  done: "fill-custom-green-400",
} as const;

export const TASK_STATUS_DOT_COLORS = {
  notStarted: "bg-custom-grey-400",
  inProgress: "bg-custom-yellow-400",
  blocked: "bg-custom-red-300",
  finalCheckAwaiting: "bg-custom-blue-400",
  done: "bg-custom-green-400",
} as const;

export const TASK_STATUS_LABELS = {
  notStarted: "Not Started",
  inProgress: "In Progress",
  blocked: "Blocked",
  finalCheckAwaiting: "Final Check Awaiting",
  done: "Done",
} as const;

export const TASK_CHECKLIST_STATUS_ICONS = {
  notStarted: defaultIcon,
  inProgress: runningIcon,
  blocked: blockedIcon,
  finalCheckAwaiting: finalCheckIcon,
  done: successIcon,
} as const;
