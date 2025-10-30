import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ChecklistItem as ChecklistItemType } from "@/entities/task";
import { TASK_STATUS } from "@/shared/lib/statusMaps";
import { ChecklistItem } from "./ChecklistItem";
import arrowIcon from "@/assets/icons/arrow.svg";

interface ChecklistCollapseProps {
  checklist: ChecklistItemType[];
  checklistTitle: string;
  onChecklistChange?: (checklist: ChecklistItemType[]) => void;
  onChecklistTitleChange?: (title: string) => void;
  disabled?: boolean;
  errors?: {
    title?: string;
    items?: Array<{ text?: string }>;
  };
}

export const ChecklistCollapse = ({
  checklist,
  checklistTitle,
  onChecklistChange,
  onChecklistTitleChange,
  disabled = false,
  errors,
}: ChecklistCollapseProps) => {
  const hasExistingItems = checklist.length > 0 || checklistTitle.length > 0;
  const [isOpen, setIsOpen] = useState(hasExistingItems);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const checklistTitleItem: ChecklistItemType = {
    id: "checklist-title",
    text: checklistTitle,
    status: TASK_STATUS.notStarted,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const addNewItem: ChecklistItemType = {
    id: "add-new-item",
    text: "ADD NEW ITEM",
    status: TASK_STATUS.notStarted,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const handleChecklistTitleUpdate = (updatedItem: ChecklistItemType) => {
    if (onChecklistTitleChange) {
      onChecklistTitleChange(updatedItem.text);
    }
  };

  const handleAddItemClick = () => {
    if (!onChecklistChange) return;

    const newItem: ChecklistItemType = {
      id: uuidv4(),
      text: "",
      status: TASK_STATUS.notStarted,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onChecklistChange([...checklist, newItem]);
  };

  const handleUpdateItem = (updatedItem: ChecklistItemType) => {
    if (!onChecklistChange) return;

    const updatedChecklist = checklist.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );

    onChecklistChange(updatedChecklist);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!onChecklistChange) return;

    const updatedChecklist = checklist.filter((item) => item.id !== itemId);
    onChecklistChange(updatedChecklist);
  };

  return (
    <div className="border border-custom-grey-200 rounded-lg">
      <button
        type="button"
        onClick={toggleCollapse}
        disabled={disabled}
        className="w-full flex items-center justify-between p-4 hover:bg-custom-grey-100 transition-colors rounded-lg"
      >
        <span className="text-h2 text-custom-main">Checklist</span>
        <img
          src={arrowIcon}
          alt="Toggle"
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-4 border-t border-custom-grey-200">
          <div className="space-y-5">
            <ChecklistItem
              item={checklistTitleItem}
              onUpdate={handleChecklistTitleUpdate}
              disabled={disabled}
              isChecklistTitle
              error={errors?.title}
            />

            {checklist.map((item, index) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
                disabled={disabled}
                error={errors?.items?.[index]?.text}
              />
            ))}

            <ChecklistItem
              item={addNewItem}
              onUpdate={handleAddItemClick}
              disabled={disabled}
              isAddButton
            />
          </div>
        </div>
      )}
    </div>
  );
};
