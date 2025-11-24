# Code Generation Rules for Next.js Projects

This document defines the rules and conventions that must be followed when generating code for Next.js projects following our architecture.

## ✅ ALWAYS Use

### HTML Elements

- ✅ `div` for containers
- ✅ `span` or `p` for text
- ✅ `button` for buttons (or `OButton` component)
- ✅ `input` for inputs (or `OTextInput` component)
- ✅ `form` for forms
- ✅ `label` for form labels
- ✅ `select` for dropdowns
- ✅ `textarea` for multiline text
- ✅ `img` or Next.js `Image` for images

### Web Event Handlers

- ✅ `onClick={(e) => {}}` for button clicks
- ✅ `onChange={(e) => setValue(e.target.value)}` for inputs
- ✅ `onSubmit={(e) => { e.preventDefault(); }}` for forms
- ✅ `onKeyDown`, `onKeyUp`, `onKeyPress` for keyboard events
- ✅ `onFocus`, `onBlur` for focus events

### Next.js Routing

- ✅ `import Link from 'next/link'` for navigation links
- ✅ `import { useRouter } from 'next/router'` for programmatic navigation
- ✅ `useRouter().push('/path')` for navigation
- ✅ `useRouter().replace('/path')` for replace navigation
- ✅ `useRouter().back()` for going back
- ✅ File-based routing in `pages/` directory

### Styling

- ✅ Tailwind CSS classes via `className` prop
- ✅ Inline styles for dynamic values: `style={{ color: primaryColor }}`
- ✅ CSS variables via `useCSSVar` hook
- ✅ Theme-aware styling using CSS variables

### State Management

- ✅ React Query for server state: `useQuery`, `useMutation`
- ✅ React Hook Form for forms: `useForm`, `FormProvider`
- ✅ React Context for global state (theme, user, etc.)
- ✅ `useState` for local component state
- ✅ `useEffect` for side effects

### Storage

- ✅ `localStorage` via `storage.ts` utility functions
- ✅ `getItem(key)`, `setItem(key, value)`, `removeItem(key)`

### Theme System

- ✅ `useTheme()` hook for theme management
- ✅ `useCSSVar('--color-primary-600')` for accessing theme colors
- ✅ CSS variables defined in `/base/theme/colors.ts`
- ✅ `localStorage` for theme persistence

## 📋 Component Generation Rules

### Base Components Structure

```tsx
// ✅ CORRECT: Using base components and HTML elements
import { OButton, OCard } from "@/base";

function MyPage() {
  return (
    <div className="p-4">
      <OCard variant="elevated">
        <h1 className="text-xl font-bold">Title</h1>
        <OButton variant="primary" onClick={() => {}}>
          Click Me
        </OButton>
      </OCard>
    </div>
  );
}
```

```tsx
// ❌ WRONG: Using incorrect patterns
function MyPage() {
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 20 }}>Title</h1>
      <div onClick={() => {}}>
        <span>Click Me</span>
      </div>
    </div>
  );
}
```

### Form Components

```tsx
// ✅ CORRECT: Using base form components
import { OTextInput, OSwitch } from "@/base";
import { useForm, FormProvider } from "react-hook-form";

function MyForm() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <OTextInput name="email" label="Email" type="email" required />
      <OSwitch name="notifications" label="Enable notifications" />
    </FormProvider>
  );
}
```

```tsx
// ❌ WRONG: Using incorrect form patterns
function MyForm() {
  return (
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="checkbox"
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    />
  );
}
```

### Navigation

```tsx
// ✅ CORRECT: Using Next.js routing
import Link from "next/link";
import { useRouter } from "next/router";

function Navigation() {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <OButton onClick={() => router.push("/contact")}>Go to Contact</OButton>
    </nav>
  );
}
```

```tsx
// ❌ WRONG: Using incorrect routing patterns
function Navigation() {
  return (
    <button onClick={() => (window.location.href = "/about")}>
      Go to About
    </button>
  );
}
```

### Data Fetching

```tsx
// ✅ CORRECT: Using React Query
import { useQuery } from "@tanstack/react-query";
import { OLoadingSpinner, OErrorState, OEmptyState } from "@/base";

function DataList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isLoading) return <OLoadingSpinner centered />;
  if (error) return <OErrorState message={error.message} onRetry={refetch} />;
  if (!data?.length) return <OEmptyState title="No items" />;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Theme Usage

```tsx
// ✅ CORRECT: Using theme system
import { useTheme, useCSSVar, OButton } from "@/base";

function ThemedComponent() {
  const { isDark, setTheme } = useTheme();
  const primaryColor = useCSSVar("--color-primary-600");

  return (
    <div style={{ backgroundColor: primaryColor }}>
      <p>Current theme: {isDark ? "Dark" : "Light"}</p>
      <OButton onClick={() => setTheme(isDark ? "light" : "dark")}>
        Toggle Theme
      </OButton>
    </div>
  );
}
```

## 📁 File Structure Rules

### Pages Directory

- ✅ All pages in `pages/` directory
- ✅ `pages/_app.tsx` for root app component
- ✅ `pages/404.tsx` for 404 page
- ✅ `pages/index.tsx` for home page
- ✅ Use file-based routing (e.g., `pages/about.tsx` → `/about`)

### Base Layer

- ✅ All reusable components in `/base/components/`
- ✅ All hooks in `/base/hooks/`
- ✅ All utilities in `/base/utils/`
- ✅ All types in `/base/types/`
- ✅ All exports through `index.ts` files

### Import Paths

- ✅ Use path aliases: `@/base`, `@/providers`, `@/pages`
- ✅ Never use relative paths like `../../base`
- ✅ Import from index files: `import { OButton } from '@/base'`

## 🎨 Styling Rules

### Tailwind CSS

- ✅ Use Tailwind utility classes: `className="p-4 bg-white rounded-lg"`
- ✅ Use responsive classes: `className="md:p-8 lg:p-12"`
- ✅ Use theme colors via CSS variables: `className="text-[var(--color-primary-600)]"`

### Inline Styles

- ✅ Only for dynamic values: `style={{ color: primaryColor }}`
- ✅ Use `useCSSVar` hook for theme colors
- ✅ Combine with Tailwind: `className="p-4" style={{ backgroundColor: color }}`

### CSS Variables

- ✅ Access via `useCSSVar('--color-primary-600')`
- ✅ Define in `/base/theme/colors.ts`
- ✅ Use in inline styles, not in className

## 🔧 TypeScript Rules

### Type Definitions

- ✅ Always define prop types for components
- ✅ Use interfaces for object types
- ✅ Export types from `/base/types/`
- ✅ Use generic types where appropriate

### Path Aliases

- ✅ Configure in `tsconfig.json`
- ✅ Use `@/base/*` for base layer imports
- ✅ Use `@/providers/*` for provider imports

## 📝 Code Quality Rules

### Component Naming

- ✅ Base components prefixed with `O`: `OButton`, `OCard`, `OIcon`
- ✅ Feature components use PascalCase: `UserProfile`, `InvoiceList`
- ✅ Pages use PascalCase: `HomePage`, `AboutPage`

### File Naming

- ✅ Components: `OButton.tsx`, `UserProfile.tsx`
- ✅ Hooks: `useTheme.ts`, `useDebounce.ts`
- ✅ Utils: `format.ts`, `validation.ts`
- ✅ Types: `common.ts`, `user.ts`

### Documentation

- ✅ JSDoc comments for all public functions
- ✅ Type definitions for all props
- ✅ Usage examples in component files

## ✅ Checklist Before Generating Code

- [ ] Using HTML elements (div, span, p, button) or base components
- [ ] Using web event handlers (onClick, onChange)
- [ ] Using Next.js routing (next/link, next/router)
- [ ] Using Tailwind CSS for styling
- [ ] Using React Query for data fetching
- [ ] Using React Hook Form for forms
- [ ] Using theme system (useTheme, useCSSVar)
- [ ] Using localStorage via storage utility
- [ ] TypeScript types defined
- [ ] Path aliases used (@/base, etc.)
- [ ] Components prefixed with `O` if in base layer
- [ ] Exports through index.ts files

## 🚨 Common Mistakes to Avoid

1. ❌ Using `window.location.href` instead of Next.js routing (`next/link` or `useRouter()`)
2. ❌ Using inline styles for static values instead of Tailwind classes
3. ❌ Using relative import paths instead of path aliases (`@/base`)
4. ❌ Not handling loading, error, and empty states in data fetching
5. ❌ Not using TypeScript types for component props
6. ❌ Using `div` for buttons instead of `button` element or `OButton`
7. ❌ Not using React Hook Form for form validation
8. ❌ Not using theme system for colors (hardcoding colors)
9. ❌ Not exporting components through index.ts files
10. ❌ Using incorrect HTML semantics (e.g., `div` for text instead of `p` or `span`)

## 📚 Reference

When in doubt, refer to:

- `/base/docs/architecture.md` - Architecture guide
- `/base/examples/` - Code examples
- Base component files - Implementation reference
- This document - Code generation rules
