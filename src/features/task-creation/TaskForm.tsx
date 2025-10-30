import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { TextField, Button } from "@/shared/ui";
import { computeOverallStatus } from "@/entities/task/task.utils";
import { TASK_STATUS, TASK_STATUS_LIST } from "@/shared/lib/statusMaps";
import Status from "./Status";
import { ChecklistCollapse } from "./ChecklistCollapse";
import type { TaskFormData, TaskFormProps } from "./TaskForm.types";

const DEFAULT_CHECKLIST = {
  title: "Construction Checklist",
  items: [
    {
      id: uuidv4(),
      text: "Foundation inspection",
      status: TASK_STATUS.done,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      text: "Framing installation",
      status: TASK_STATUS.inProgress,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      text: "Electrical wiring",
      status: TASK_STATUS.blocked,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      text: "Plumbing rough-in",
      status: TASK_STATUS.finalCheckAwaiting,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      text: "Drywall installation",
      status: TASK_STATUS.notStarted,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

const taskSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, "Name is required")
    .max(200, "Name must be less than 200 characters")
    .required("Name is required"),
  overallStatus: Yup.string()
    .oneOf([...TASK_STATUS_LIST])
    .required("Status is required"),
  checklist: Yup.object().shape({
    title: Yup.string().when("items", {
      is: (items: unknown[]) => items && items.length > 0,
      then: (schema) =>
        schema
          .trim()
          .min(1, "Checklist title is required")
          .max(200, "Checklist title must be less than 200 characters")
          .required("Checklist title is required"),
      otherwise: (schema) => schema,
    }),
    items: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required(),
          text: Yup.string()
            .trim()
            .min(1, "Item text is required")
            .max(500, "Item text must be less than 500 characters")
            .required("Item text is required")
            .test("unique-text", "Item text must be unique", function (value) {
              if (!value) return true;
              const items = this.from?.[1]?.value?.items;
              if (!items) return true;
              const trimmedValue = value.trim().toLowerCase();
              const duplicates = items.filter(
                (item: { text: string }) =>
                  item.text.trim().toLowerCase() === trimmedValue
              );
              return duplicates.length <= 1;
            }),
          status: Yup.string()
            .oneOf([...TASK_STATUS_LIST])
            .required(),
          createdAt: Yup.date().required(),
          updatedAt: Yup.date().required(),
        })
      )
      .test("unique-items", "All items must be unique", function (items) {
        if (!items || items.length === 0) return true;
        const texts = items
          .map((item) => item.text?.trim().toLowerCase())
          .filter(Boolean);
        const uniqueTexts = new Set(texts);
        return texts.length === uniqueTexts.size;
      }),
  }),
});

export const TaskForm = ({
  task,
  pinPosition,
  onSubmit,
  onCancel,
  onFormChange,
  isLoading = false,
}: TaskFormProps) => {
  const initialValues: TaskFormData = {
    name: task?.name || "",
    overallStatus:
      task?.overallStatus || computeOverallStatus(DEFAULT_CHECKLIST.items),
    checklist: task?.checklist || DEFAULT_CHECKLIST,
  };

  const handleSubmit = (values: TaskFormData) => {
    if (onFormChange) {
      onFormChange(values.name, values.overallStatus);
    }
    onSubmit({ ...values, pinPosition });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={taskSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, setFieldValue }) => {
          const handleChecklistChange = (
            items: TaskFormData["checklist"]["items"]
          ) => {
            const newStatus = computeOverallStatus(items);
            setFieldValue("checklist", { ...values.checklist, items });
            setFieldValue("overallStatus", newStatus);
          };

          const handleChecklistTitleChange = (title: string) => {
            setFieldValue("checklist", { ...values.checklist, title });
          };

          return (
            <Form className="space-y-4 justify-between items-center">
              <TextField
                component={Field}
                name="name"
                placeholder="Task name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                disabled={isLoading}
                className="text-h1 placeholder:text-h1"
              />
              <Status status={values.overallStatus} />

              <ChecklistCollapse
                checklist={values.checklist.items}
                checklistTitle={values.checklist.title}
                onChecklistChange={handleChecklistChange}
                onChecklistTitleChange={handleChecklistTitleChange}
                disabled={isLoading}
                errors={
                  errors.checklist as {
                    title?: string;
                    items?: Array<{ text?: string }>;
                  }
                }
              />

              <div className="flex gap-3 ">
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  loading={isLoading}
                  disabled={!pinPosition && !task}
                  className="flex-1"
                >
                  {task ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
