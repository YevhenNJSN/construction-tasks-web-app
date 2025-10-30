import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "@/pages/auth/AuthPage";
import { AppLayout } from "@/pages/app/AppLayout";
import { PlanView } from "@/pages/plan/PlanView";
import { TasksView } from "@/pages/tasks/TasksView";
import { ROUTES } from "@/shared/lib/routes";
import Page404 from "@/pages/app/Page404";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.ROOT}
        element={<Navigate to={ROUTES.AUTH} replace />}
      />
      <Route path={ROUTES.AUTH} element={<AuthPage />} />

      <Route path={ROUTES.APP} element={<AppLayout />}>
        <Route index element={<Navigate to={ROUTES.PLAN} replace />} />
        <Route path={ROUTES.PLAN} element={<PlanView />} />
        <Route path={ROUTES.TASKS} element={<TasksView />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
