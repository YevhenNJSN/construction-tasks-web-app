import { Outlet, NavLink, Link } from "react-router-dom";
import { AuthGuard } from "@/features/auth/AuthGuard";
import { ROUTES } from "@/shared/lib/routes";
import { useAuthContext } from "@/app/providers/auth/useAuthContext";
import { Button } from "@/shared/ui";

const NAV_ITEMS = [
  { to: ROUTES.PLAN, label: "Floor Plan" },
  { to: ROUTES.TASKS, label: "Tasks" },
];

export const AppLayout = () => {
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-grey-100 flex flex-col">
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link
                  to={ROUTES.PLAN}
                  className="text-h2 text-main hover:text-blue-900 transition-colors"
                  aria-label="Go to floor plan - Construction Tasks home"
                >
                  <h1 className="text-h2">Construction Tasks</h1>
                </Link>
                <nav aria-label="Main navigation">
                  <ul className="flex space-x-4">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `px-3 py-2 rounded-md text-body transition-colors ${
                              isActive
                                ? "bg-blue-100 text-blue-900"
                                : "text-grey-600 hover:text-main hover:bg-grey-100"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                {user && (
                  <span
                    className="text-caption text-grey-600"
                    aria-label={`Logged in as ${user.name}`}
                  >
                    Welcome,{" "}
                    <span className="text-body text-main">{user.name}</span>
                  </span>
                )}
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="primary"
                  size="small"
                  aria-label="Logout from application"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1" role="main">
          <Outlet />
        </main>
      </div>
    </AuthGuard>
  );
};
