# Next.js Architecture and AI Agent Guidelines

## Tech Stack Overview
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS (v4)
- **UI Components:** shadcn/ui
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Icons:** lucide-react
- **Fonts:** Rubik (via `next/font/google`)

## Folder Structure

The project uses a **feature-based architecture**. This keeps related code together instead of scattering it by type (e.g., all components in one folder, all hooks in another).

```
src/
  app/                          # Next.js routes (thin layer, no business logic)
    (auth)/
      login/page.tsx
      register/page.tsx
    (protected)/
      dashboard/page.tsx
    layout.tsx
    globals.css
  middleware.ts                 # Route protection logic
  features/                     # Feature-based modules
    auth/
      api/                      # Axios calls & react-query hooks (e.g., auth.api.ts, auth.queries.ts, auth.mutations.ts)
      components/               # Feature-specific components (e.g., LoginForm.tsx)
      types/                    # Feature-specific types (e.g., auth.types.ts)
      index.ts                  # Barrel export for the feature
  components/
    ui/                         # shadcn/ui components (Button, Input, etc.)
    common/                     # Shared cross-feature components (Navbar, Footer, etc.)
  lib/                          # Core configurations
    axios.ts                    # Axios instance with interceptors
    query-client.ts             # React Query client setup
    utils.ts                    # Utility functions (cn, etc.)
  providers/
    QueryProvider.tsx           # Global providers
```

## Conventions

1. **Feature Folders:** When adding a new domain/feature (e.g., `users`, `products`), create a new folder under `src/features/`.
2. **Thin App Router:** Keep the files in `src/app/` thin. Delegate business logic, data fetching, and complex UI to the `features/` directory.
3. **Data Fetching:** Use the pre-configured Axios instance (`@/lib/axios`) combined with TanStack Query.
4. **Strict Typing:** Avoid `any`. Define interfaces in the `types/` folder of the respective feature.
5. **Barrel Exports:** Always export feature contents from `features/<feature-name>/index.ts` and import from there (e.g., `import { LoginForm } from '@/features/auth'`).

## Data Fetching Pattern (Axios + TanStack Query)

Example Query:
```typescript
// features/users/api/users.api.ts
import { axiosInstance } from '@/lib/axios';

export const getUsers = async () => {
  const { data } = await axiosInstance.get('/users');
  return data;
};

// features/users/api/users.queries.ts
import { useQuery } from '@tanstack/react-query';
import { getUsers } from './users.api';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
```

## Auth and Route Protection

- **Middleware (`src/middleware.ts`):** Checks for the presence of a token (e.g., cookie `auth-token`).
- If a user tries to access a route in the `protectedRoutes` array (e.g., `/dashboard`) without a token, they are redirected to `/login`.
- If a user is already authenticated and tries to visit an auth route (e.g., `/login`), they are redirected to `/dashboard`.
- **Axios Interceptors:** The `axiosInstance` includes a response interceptor to catch `401 Unauthorized` responses and can trigger a redirect to login or handle token refreshes.

## Commands

- **Run Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Lint:** `npm run lint`
- **Add shadcn/ui Component:** `npx shadcn@latest add <component-name>`

## Notes for AI Agents
- **Do not bypass the feature architecture.** If you need to add a new view, identify the feature it belongs to, place the logic there, and only wire it up in `src/app/`.
- Ensure new API routes use the central `axiosInstance`.
- Shadcn is configured with Tailwind v4, utilizing `@theme` in `globals.css` rather than a complex `tailwind.config.ts`.
