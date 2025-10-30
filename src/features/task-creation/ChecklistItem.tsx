import { useState } from "react";
import type {
  ChecklistItem as ChecklistItemType,
  TaskStatus,
} from "@/entities/task";
import {
  TASK_STATUS_LIST,
  TASK_CHECKLIST_STATUS_ICONS,
} from "@/shared/lib/statusMaps";
import { TextField } from "@/shared/ui";
import { Status } from "./Status";
import checklistIcon from "@/assets/icons/checklist.svg";
import addIcon from "@/assets/icons/add.svg";
import deleteIcon from "@/assets/icons/delete.svg";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onUpdate?: (item: ChecklistItemType) => void;
  onDelete?: (itemId: string) => void;
  disabled?: boolean;
  isChecklistTitle?: boolean;
  isAddButton?: boolean;
  error?: string;
}

const CHECKLIST_ITEM_ICONS = {
  title: checklistIcon,
  add: addIcon,
} as const;

const STATUS_CYCLE: TaskStatus[] = [...TASK_STATUS_LIST];

export const ChecklistItem = ({
  item,
  onUpdate,
  onDelete,
  disabled = false,
  isChecklistTitle = false,
  isAddButton = false,
  error,
}: ChecklistItemProps) => {
  const [text, setText] = useState(item.text);

  const isChecklistItem = !isChecklistTitle && !isAddButton;

  const getNextStatus = (currentStatus: TaskStatus): TaskStatus => {
    const currentIndex = STATUS_CYCLE.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % STATUS_CYCLE.length;
    return STATUS_CYCLE[nextIndex];
  };

  const handleIconClick = () => {
    if (isAddButton) {
      handleAddButtonClick();
      return;
    }

    if (isChecklistTitle) {
      return;
    }

    if (onUpdate) {
      const nextStatus = getNextStatus(item.status);
      onUpdate({
        ...item,
        status: nextStatus,
        updatedAt: new Date(),
      });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleTextBlur = () => {
    if (text !== item.text && onUpdate) {
      onUpdate({ ...item, text, updatedAt: new Date() });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.id);
    }
  };

  const handleAddButtonClick = () => {
    if (isAddButton && onUpdate) {
      onUpdate(item);
    }
  };

  const getIconSrc = () => {
    if (isChecklistTitle) return CHECKLIST_ITEM_ICONS.title;
    if (isAddButton) return CHECKLIST_ITEM_ICONS.add;

    return TASK_CHECKLIST_STATUS_ICONS[item.status];
  };

  const getIconAlt = () => {
    if (isChecklistTitle) return "Checklist";
    if (isAddButton) return "Add";
    return "Item";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleIconClick}
          disabled={disabled}
          className="flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src={getIconSrc()} alt={getIconAlt()} />
        </button>

        <div className="flex-1">
          {isAddButton ? (
            <button
              type="button"
              onClick={handleAddButtonClick}
              disabled={disabled}
              className="w-full text-left text-body text-custom-blue-500 hover:text-custom-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item.text}
            </button>
          ) : (
            <TextField
              variant="outlined"
              value={text}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              placeholder={
                isChecklistTitle ? "Checklist title" : "Checklist item"
              }
              disabled={disabled}
              className="text-body"
              error={!!error}
              helperText={error}
            />
          )}

          {isChecklistItem && (
            <div className="mt-2">
              <Status status={item.status} />
            </div>
          )}
        </div>

        {isChecklistItem && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={disabled}
            className="flex-shrink-0 hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src={deleteIcon} alt="Delete" className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
