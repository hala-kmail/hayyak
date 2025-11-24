# Next.js Project Generation Prompt

Use this prompt to generate a new Next.js project following our established folder structure and architecture.

## Prompt Template

```
Create a new Next.js project with the following specifications:

### Framework & Stack
- Next.js 16.x (latest stable) with Pages Router (file-based routing)
- TypeScript 5.7.x (latest stable)
- React 19.x (latest stable, compatible with Next.js 16)
- React DOM 19.x (latest stable)
- Tailwind CSS 3.4.x (latest stable) for styling
- React Query (@tanstack/react-query 5.x) for server state management
- React Hook Form 7.x (latest stable) for form handling
- @hookform/resolvers 3.x (latest stable) for form validation resolvers
- Zod 3.23.x (latest stable) for schema validation
- Day.js 1.11.x (latest stable) for date manipulation

### Project Structure

```

project-name/
├── pages/ # Next.js Pages Router
│ ├── \_app.tsx # Root app with providers
│ ├── index.tsx # Home page
│ ├── 404.tsx # 404 page
│ └── [feature-pages]/ # Feature-specific pages
│
├── base/ # 🎯 Reusable foundation layer
│ ├── components/ # Reusable UI components
│ │ ├── ui/ # Core UI elements
│ │ │ ├── OButton.tsx # button with variants
│ │ │ ├── OCard.tsx # card container
│ │ │ ├── OIcon.tsx # icon component
│ │ │ ├── OBadge.tsx # status badge
│ │ │ ├── OSkeleton.tsx # loading skeleton
│ │ │ └── index.ts
│ │ ├── form/ # Form components
│ │ │ ├── OTextInput.tsx # input with validation
│ │ │ ├── OSwitch.tsx # checkbox/switch
│ │ │ └── index.ts
│ │ ├── layout/ # Layout components
│ │ │ ├── ScreenLayout.tsx # page wrapper
│ │ │ └── index.ts
│ │ ├── feedback/ # Feedback components
│ │ │ ├── OLoadingSpinner.tsx # loading indicator
│ │ │ ├── OEmptyState.tsx # empty state
│ │ │ ├── OErrorState.tsx # error state
│ │ │ └── index.ts
│ │ └── index.ts
│ │
│ ├── hooks/ # Custom React hooks
│ │ ├── useCSSVar.ts # Access theme CSS variables
│ │ ├── useTheme.ts # Theme management
│ │ ├── useMounted.ts # Component mount tracking
│ │ ├── useDebounce.ts # Value debouncing
│ │ ├── useToggle.ts # Boolean state management
│ │ ├── useKeyboard.ts # Keyboard events (web)
│ │ ├── useResponsive.ts # Responsive design utilities
│ │ └── index.ts
│ │
│ ├── utils/ # Utility functions
│ │ ├── delay.ts # Promise-based delay
│ │ ├── format.ts # Formatting (currency, numbers)
│ │ ├── string.ts # String manipulation
│ │ ├── date.ts # Date utilities (Day.js)
│ │ ├── validation.ts # Validation helpers
│ │ ├── storage.ts # localStorage utilities
│ │ └── index.ts
│ │
│ ├── theme/ # Theme configuration
│ │ ├── colors.ts # Color definitions (50+ CSS variables)
│ │ ├── spacing.ts # Spacing system
│ │ ├── typography.ts # Typography system
│ │ └── index.ts
│ │
│ ├── types/ # TypeScript types
│ │ ├── common.ts # Shared type definitions
│ │ └── index.ts
│ │
│ ├── api/ # API utilities
│ │ ├── httpClient.ts # HTTP client class
│ │ ├── queryClient.ts # React Query configuration
│ │ └── index.ts
│ │
│ ├── examples/ # Usage examples
│ │ ├── ListScreen.example.tsx
│ │ ├── FormScreen.example.tsx
│ │ ├── DetailScreen.example.tsx
│ │ ├── ThemeUsage.example.tsx
│ │ └── README.md
│ │
│ ├── docs/ # Documentation
│ │ └── architecture.md
│ │
│ ├── index.ts # Central export point
│ └── README.md
│
├── providers/ # React context providers
│ ├── ThemeProvider.tsx # Theme management
│ ├── QueryClientProvider.tsx # React Query provider
│ └── index.ts
│
├── public/ # Static assets
│ ├── favicon.ico
│ └── [images]/
│
├── styles/ # Global styles
│ └── globals.css # Tailwind imports + theme CSS variables
│
├── next.config.js # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Dependencies
├── .eslintrc.json # ESLint configuration
├── .prettierrc # Prettier configuration
└── README.md # Project documentation

````

### Key Requirements

1. **Component Naming Convention**
   - All base components prefixed with `O` (e.g., OButton, OCard, OIcon)
   - Use semantic HTML elements (div, span, p, button, input, etc.)
   - Use standard HTML elements for containers and text

2. **Event Handlers**
   - Use `onClick` instead of `onPress`
   - Use `onChange` with `e.target.value` instead of `onChangeText`
   - Use standard web event handlers

3. **Styling**
   - Use Tailwind CSS classes via `className` prop
   - Support theme CSS variables via `useCSSVar` hook
   - Use inline styles only for dynamic theme values
   - Use `className` for static styles, inline `style` prop for dynamic values

4. **Routing**
   - Use Next.js Pages Router (file-based routing in `pages/` directory)
   - Use `next/link` for navigation links
   - Use `next/router` `useRouter()` hook for programmatic navigation
   - File-based routing only (no other routing libraries)

5. **Theme System**
   - Light/dark mode support via CSS variables
   - Theme persistence using localStorage
   - Theme detection using `window.matchMedia` for system preference
   - Theme variables defined in `/base/theme/colors.ts`

6. **State Management**
   - React Query for server state
   - React Context for global client state (theme, etc.)
   - React Hook Form for form state
   - Local state with useState when appropriate

7. **TypeScript**
   - Full type safety throughout
   - Path aliases configured: `@/base`, `@/providers`, `@/pages`, etc.
   - Strict mode enabled

8. **Code Organization**
   - Base layer components are framework-agnostic and reusable
   - Feature-specific code goes in feature directories
   - All exports go through index.ts files
   - JSDoc comments for all public APIs

### Initial Setup

1. Create `pages/_app.tsx` with:
   - ThemeProvider wrapper
   - QueryClientProvider wrapper
   - Global CSS import

2. Create `pages/index.tsx` as home page

3. Create `pages/404.tsx` for 404 handling

4. Set up Tailwind CSS with:
   - Theme CSS variables support
   - Custom color palette
   - Responsive breakpoints

5. Configure TypeScript paths:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"],
         "@/base/*": ["./base/*"],
         "@/providers/*": ["./providers/*"],
         "@/pages/*": ["./pages/*"]
       }
     }
   }
````

6. Create base components following the structure above

7. Set up providers (ThemeProvider, QueryClientProvider)

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

### Dependencies

**Production Dependencies:**

```json
{
  "dependencies": {
    "next": "^16.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@tanstack/react-query": "^5.62.0",
    "react-hook-form": "^7.54.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8",
    "dayjs": "^1.11.13"
  }
}
```

**Development Dependencies:**

```json
{
  "devDependencies": {
    "typescript": "^5.7.2",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/node": "^22.10.0",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.17.0",
    "eslint-config-next": "^16.0.3",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.9"
  }
}
```

### Installation Commands

**Step 1: Initialize Next.js Project**

```bash
npx create-next-app@latest project-name --typescript --tailwind --eslint --app=false --pages
cd project-name
```

**Step 2: Install Production Dependencies**

```bash
npm install next@latest react@latest react-dom@latest @tanstack/react-query@latest react-hook-form@latest @hookform/resolvers@latest zod@latest dayjs@latest
```

**Step 3: Install Development Dependencies**

```bash
npm install -D typescript@latest @types/react@latest @types/react-dom@latest @types/node@latest tailwindcss@latest postcss@latest autoprefixer@latest eslint@latest eslint-config-next@latest prettier@latest prettier-plugin-tailwindcss@latest
```

**Step 4: Verify Installation**

```bash
npm list --depth=0
npm run dev
```

### Compatibility Notes

- **Next.js 16.x** requires **React 19.x** and **React DOM 19.x**
- **@tanstack/react-query 5.x** is compatible with React 19
- **React Hook Form 7.x** is compatible with React 19
- **Zod 3.23.x** is the latest stable version
- **TypeScript 5.7.x** supports all React 19 features
- **Tailwind CSS 3.4.x** works with Next.js 16
- All versions are tested and compatible with each other

### Version Verification

After installation, verify versions match:

```bash
npm list next react react-dom @tanstack/react-query react-hook-form zod dayjs typescript tailwindcss
```

Generate the complete project structure with all base components, hooks, utilities, and configuration files following these specifications.

````

## Installation Instructions

### Quick Start (Recommended)

```bash
# 1. Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest my-project --typescript --tailwind --eslint --app=false --pages
cd my-project

# 2. Install all production dependencies
npm install next@latest react@latest react-dom@latest @tanstack/react-query@latest react-hook-form@latest @hookform/resolvers@latest zod@latest dayjs@latest

# 3. Install all development dependencies
npm install -D typescript@latest @types/react@latest @types/react-dom@latest @types/node@latest tailwindcss@latest postcss@latest autoprefixer@latest eslint@latest eslint-config-next@latest prettier@latest prettier-plugin-tailwindcss@latest

# 4. Verify installation
npm list --depth=0

# 5. Start development server
npm run dev
````

### Manual Installation

If you prefer to set up manually:

1. **Initialize package.json:**

   ```bash
   npm init -y
   ```

2. **Install dependencies one by one:**

   ```bash
   # Core framework
   npm install next@latest react@latest react-dom@latest

   # State management and forms
   npm install @tanstack/react-query@latest react-hook-form@latest @hookform/resolvers@latest

   # Validation and utilities
   npm install zod@latest dayjs@latest

   # Development tools
   npm install -D typescript@latest @types/react@latest @types/react-dom@latest @types/node@latest
   npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
   npm install -D eslint@latest eslint-config-next@latest
   npm install -D prettier@latest prettier-plugin-tailwindcss@latest
   ```

3. **Initialize Tailwind CSS:**
   ```bash
   npx tailwindcss init -p
   ```

## Usage Instructions

1. **Copy the prompt above** and use it with an AI assistant or code generator
2. **Run installation commands** to set up dependencies
3. **Customize** the project name and specific requirements as needed
4. **Verify** the generated structure matches the architecture
5. **Test** that all components work with web standards

## Key Points to Emphasize

- ✅ Use standard HTML elements (div, span, button, input)
- ✅ Use web event handlers (onClick, onChange)
- ✅ Use Tailwind CSS for styling
- ✅ Use Next.js Pages Router for routing
- ✅ Use localStorage for theme persistence
- ✅ Follow the base layer component structure
- ✅ All components prefixed with `O`
- ✅ Full TypeScript support
- ✅ Path aliases configured

## Verification Checklist

### Installation Verification

- [ ] All dependencies installed successfully (`npm list --depth=0`)
- [ ] No peer dependency warnings
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] ESLint runs without errors (`npm run lint`)

### Project Structure Verification

- [ ] All components use HTML elements (div, span, p, button, input)
- [ ] Event handlers use web standards (onClick, onChange)
- [ ] Routing uses Next.js Pages Router
- [ ] Theme system uses localStorage
- [ ] TypeScript paths are configured correctly
- [ ] All base components are exported through index.ts files
- [ ] Providers are set up in `pages/_app.tsx`
- [ ] Tailwind CSS is configured and working

### Runtime Verification

- [ ] Project runs with `npm run dev`
- [ ] No console errors in browser
- [ ] Hot reload works correctly
- [ ] Build succeeds (`npm run build`)
- [ ] Production server starts (`npm start`)

### Version Verification

- [ ] Next.js version: 16.x
- [ ] React version: 19.x
- [ ] TypeScript version: 5.7.x
- [ ] All dependencies are latest stable versions
