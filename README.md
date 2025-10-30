# Construction Tasks Web App

A minimal offline-first web application for managing construction tasks on floor plans. Built with React 19, TypeScript, and RxDB for real offline capabilities.

## Time spent on each feature:

| Feature/Phase                  | Hours Spent |
| ------------------------------ | :---------: |
| Investigation & Initialization |      6      |
| App Design Layers              |      6      |
| User Feature                   |      6      |
| User Authentication            |      6      |
| Task Feature                   |      8      |
| Layout                         |     14      |
| **Total**                      |   **46**    |

## Video presentation

[Loom link](https://www.loom.com/share/4ad7bba5364c4bc391d0c03bc6c5416b) 

## Key Features

- **Interactive Floor Plans**: Place pins on floor plans to create tasks
- **Task Checklists**: Detailed checklists for each task with multiple status types
- **True Offline Support**: All data stored locally in localStorage
- **User Isolation**: Each user's data is private and isolated

## Tech Stack

- **Frontend**: React 19 + Vite + TypeScript (strict mode)
- **State Management**: Zustand for UI state
- **Database**: RxDB with localStorage adapter
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Forms**: Formik + Yup validation

## User Journey

1. **Login**

   - The application opens on the `/auth` page.
   - The user enters their name to log in (no password required).
   - After login, the user’s data is automatically isolated from other users.

2. **Plan View (`/plan`)**

   - Displays the floor plan as an interactive image.
   - The user can click anywhere on the plan to place a pin.
   - When a pin is placed, a Task Form Modal opens to create a new task.

3. **Task Creation**

   - The user provides a task title and can optionally add checklist items.
   - Each checklist item has a status that cycles through:  
     Not Started → In Progress → Blocked → Final Check Awaiting → Done.
   - The task’s overall status is automatically computed based on its checklist items.
   - After submitting the form, a pin is added to the plan showing:
     - The task’s initials.
     - A color indicating the current status.
   - Default checklist is shown for each new task.

4. **Editing Tasks**

   - Clicking a pin opens the Task Form Modal for that task.
   - The user can update task details, add or remove checklist items, and change statuses.
   - All updates are stored locally and applied instantly.
   - User able to delete selected task in edit mode.

5. **Tasks List (`/tasks`)**

   - Shows all tasks in a list view.
   - The user can view, select, edit, or delete tasks.
   - Selecting a task navigates back to the plan.

6. **Header Navigation**

   - The header includes navigation links and the logged-in user’s name:
     - Plan (`/plan`)
     - Tasks (`/tasks`)
     - Logout (clears user session and returns to `/auth`)

7. **Offline Experience**
   - All data is stored locally via RxDB using localStorage.
   - Tasks remain fully available and editable offline.
   - Vite-pwa plugin allows user to reload the app in offline mode and work from local cache after the first load.

## Installation

```bash
npm install
```

## Quick Start

### Development Mode

```bash
npm run dev
```

The app runs at `http://localhost:3000` and works **fully offline** by default.

### Production Build

```bash
npm run build
npm run preview
```

Preview runs at `http://localhost:4173`.

## Architecture

### Feature-Sliced Design (FSD)

The app follows a layered architecture with clear separation of concerns:

```
src/
├── app/                    # Application layer
│   ├── providers/          # Context providers (auth, database)
│   ├── router/             # Routing configuration
│   └── stores/             # Zustand stores (auth state)
│
├── pages/                  # Page components
│   ├── auth/               # Login page
│   ├── app/                # Main app layout
│   ├── plan/               # Floor plan view with hooks (useTasks)
│   └── tasks/              # Tasks list and detail views
│
├── features/               # Feature modules
│   ├── auth/               # Authentication (useAuth hook)
│   ├── floor-plan/         # FloorPlan component with TaskPin
│   ├── task-creation/      # TaskFormModal component
│   └── task-list/          # TaskList component
│
├── entities/               # Business entities
│   ├── user/
│   │   ├── model/          # User types, schemas
│   │   ├── repository/     # UserRepository (RxDB operations)
│   │   └── service/        # User service layer
│   └── task/
│       ├── model/          # Task types, schemas
│       ├── repository/     # TaskRepository (RxDB operations)
│       ├── service/        # Task service layer
│       └── task.utils.ts   # Task utility functions
│
└── shared/                 # Shared resources
    ├── db/                 # Database configuration
    ├── lib/                # Utilities and helpers
    │   ├── errorHandling.ts    # Centralized error handling
    │   ├── statusMaps.ts       # Status icons and labels
    │   ├── formValidation.ts   # Form validation schemas
    │   └── routes.ts           # Route constants
    └── ui/                 # Reusable UI components
        ├── Button.tsx
        ├── TextField.tsx
        └── LoadingScreen.tsx
```

### Layered Architecture

**1. Repository Layer (Data Access)**

- Located in `entities/*/repository/`
- Direct database operations with RxDB
- User-scoped data isolation (TaskRepository requires userId)
- No business logic, only CRUD operations

**2. Service Layer (Business Logic)**

- Located in `entities/*/service/`
- Orchestrates repository operations
- Handles data transformation and workflows
- Independent of UI and infrastructure

**3. Infrastructure Layer (Integration)**

- Hooks: `useTasks` (pages/plan/hooks), `useAuth` (features/auth)
- Providers: AuthProvider, DatabaseProvider
- Bridges services and UI components
- Error handling and loading states

**4. Presentation Layer (UI)**

- Pages: High-level route components
- Features: Domain-specific UI components
- Shared UI: Reusable components (Button, TextField)
- Access services only through hooks/context

### Data Flow

```
User Action (Component)
        ↓
Infrastructure (Hook/Provider)
        ↓
Service Layer (Business Logic)
        ↓
Repository Layer (Data Access)
        ↓
RxDB → localStorage
```

## Storage & Data Management

### RxDB with localStorage

- **Primary Storage**: RxDB with localStorage adapter
- **Database Name**: `construction_tasks_localstorage`
- **Dev Mode**: Validation wrapper enabled for schema checking
- **Production**: Raw storage for optimal performance
- **Persistence**: Data survives page refresh and browser restart
- **User Isolation**: Automatic per-user data filtering via userId in repositories

### Key Implementation Details

**Error Handling:**

- Centralized utility in `shared/lib/errorHandling.ts`
- Consistent error logging in development mode
- Safe error message extraction

## Styling & Design System

- **Task Status Colors**:

  - Not Started: Grey (#CFCFCF)
  - In Progress: Yellow (#FFBE3F)
  - Blocked: Red (#FF5252)
  - Final Check: Blue (#3FAEFF)
  - Done: Green (#58E766)

- **Status Icons**:
  - Centralized in `shared/lib/statusMaps.ts`

### Component Architecture

**Shared UI Components** (`shared/ui/`):

- `Button`: Primary, secondary, outlined, disabled variants with proper hover contrast
- `TextField`: Form input with label, error states and helper text
- `LoadingScreen`: Full-page loading state
- `Spinner`: Loading indicator

**Feature Components**:

- `FloorPlan`: Interactive canvas with pin placement (React.memo optimized)
- `TaskPin`: Status-colored pin markers
- `TaskFormModal`: Task creation/editing with Formik + Yup
- `TaskList`: Optimized list rendering (React.memo)
- `ChecklistItem`: Individual checklist items with status controls

**React Optimizations**:

- `useCallback`: All event handlers have stable references
- `useMemo`: Derived state (isModalOpen, hasNoTasks) is memoized
- `React.memo`: Pure components skip re-renders (FloorPlan, TaskList)

## Future Improvements & Refactoring

Due to limited development time, several enhancements and refactoring tasks can be considered for future iterations:

1. **Advanced Authorization**

   - Replace the current name-only login with secure authentication using login/password credentials.
   - Add session management with token-based authentication and automatic session expiry.

2. **Database Per User**

   - Refactor the database layer to initialize a dedicated RxDB instance per authenticated user for improved data isolation and synchronization control.

3. **End-to-End (E2E) Tests**

   - Add comprehensive E2E tests using Playwright or Cypress to ensure stable feature development and prevent regressions.
   - Automate common flows such as login, task creation, checklist updates, and offline usage.

4. **Floor Plan Enhancements**
   - Add zoom and pan capabilities for better navigation on large floor plans.
   - Allow pin parameter customization (e.g., size, color, label position) to improve usability and visual clarity.
