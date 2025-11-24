# Project Architecture and Patterns

## Introduction

This document describes the architecture, patterns, and best practices for our Next.js + TypeScript project. The project follows a modular, layered architecture that separates concerns and promotes code reuse, maintainability, and scalability.

### Why This Structure?

This architecture improves:

- **Code Readability**: Clear separation of concerns makes code easier to understand
- **Consistency**: Standardized patterns across the codebase
- **Team Collaboration**: Clear conventions make it easier for teams to work together
- **Scalability**: Modular structure allows the app to grow without becoming unwieldy
- **Maintainability**: Isolated, reusable code is easier to test and maintain
- **Onboarding**: New developers can quickly understand the project structure
- **Reusability**: Base components and utilities can be used across all features

---

## Folder Structure

```
next-js-project/
├── pages/                        # Next.js Pages Router
│   ├── _app.tsx                # Root app with providers
│   ├── index.tsx                # Home page
│   ├── [features]/              # Feature-specific pages
│   └── 404.tsx                  # 404 page
│
├── base/                         # 🎯 Reusable foundation layer (NEW)
│   ├── components/              # Reusable UI components
│   │   ├── ui/                 # Core UI elements
│   │   │   ├── OButton.tsx
│   │   │   ├── OText.tsx
│   │   │   ├── OView.tsx
│   │   │   ├── OCard.tsx
│   │   │   ├── OIcon.tsx
│   │   │   ├── OBadge.tsx
│   │   │   ├── OSkeleton.tsx
│   │   │   └── index.ts
│   │   ├── form/               # Form components
│   │   │   ├── OTextInput.tsx
│   │   │   ├── OSwitch.tsx
│   │   │   └── index.ts
│   │   ├── layout/             # Layout components
│   │   │   ├── ScreenLayout.tsx
│   │   │   └── index.ts
│   │   ├── feedback/           # User feedback components
│   │   │   ├── OLoadingSpinner.tsx
│   │   │   ├── OEmptyState.tsx
│   │   │   ├── OErrorState.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useCSSVar.ts        # Access theme CSS variables
│   │   ├── useTheme.ts         # Theme management
│   │   ├── useMounted.ts       # Check component mount state
│   │   ├── useDebounce.ts      # Debounce values
│   │   ├── useToggle.ts        # Boolean state management
│   │   ├── useKeyboard.ts      # Keyboard state tracking
│   │   ├── useResponsive.ts    # Responsive design utilities
│   │   └── index.ts
│   │
│   ├── utils/                   # Utility functions
│   │   ├── delay.ts            # Promise-based delay
│   │   ├── format.ts           # Formatting utilities (currency, numbers)
│   │   ├── string.ts           # String manipulation
│   │   ├── date.ts             # Date utilities
│   │   ├── validation.ts       # Validation helpers
│   │   ├── storage.ts          # Cross-platform storage
│   │   └── index.ts
│   │
│   ├── theme/                   # Theme configuration
│   │   ├── colors.ts           # Color definitions
│   │   ├── spacing.ts          # Spacing system
│   │   ├── typography.ts       # Typography system
│   │   └── index.ts
│   │
│   ├── types/                   # Common TypeScript types
│   │   ├── common.ts           # Shared type definitions
│   │   └── index.ts
│   │
│   ├── api/                     # API utilities
│   │   ├── httpClient.ts       # HTTP client class
│   │   ├── queryClient.ts      # React Query configuration
│   │   └── index.ts
│   │
│   ├── examples/                # Usage examples
│   │   ├── ListScreen.example.tsx
│   │   ├── FormScreen.example.tsx
│   │   ├── DetailScreen.example.tsx
│   │   ├── ThemeUsage.example.tsx
│   │   └── README.md
│   │
│   ├── docs/                    # Documentation
│   │   └── architecture.md     # This file
│   │
│   └── README.md                # Base layer overview
│
├── features/                     # Feature modules (domain-driven)
│   ├── auth/                    # Authentication feature
│   │   ├── components/         # Feature-specific components
│   │   ├── hooks/              # Feature-specific hooks
│   │   ├── services/           # API services
│   │   ├── types/              # Feature types
│   │   └── index.ts            # Public API
│   ├── invoices/               # Invoices feature
│   ├── users/                  # Users feature
│   └── [other-features]/
│
├── components/                   # Shared components (legacy)
│   ├── ui/                     # UI components
│   └── form/                   # Form components
│
├── hooks/                        # Shared hooks
├── utils/                        # Shared utilities
├── providers/                    # React context providers
│   ├── ThemeProvider.tsx
│   └── QueryClientProvider.tsx
├── constants/                    # App constants
├── types/                        # Global types
├── api/                         # API configuration
└── assets/                      # Static assets

```

---

## Architecture Layers

### 1. Base Layer (`/base`)

**Purpose**: Foundation of reusable, framework-agnostic code.

**Characteristics**:

- ✅ Framework-agnostic (no feature/screen dependencies)
- ✅ Fully typed with TypeScript
- ✅ Well-documented with JSDoc comments
- ✅ Self-contained and composable
- ✅ Thoroughly tested

**What Belongs Here**:

- Reusable UI components (buttons, cards, inputs)
- General-purpose hooks (theming, storage, keyboard)
- Utility functions (formatting, validation, dates)
- Theme configuration
- API client utilities
- Common TypeScript types

**What Doesn't Belong**:

- Feature-specific logic
- Screen components
- Business rules
- API endpoint definitions

### 2. Feature Layer (`/features`)

**Purpose**: Domain-driven feature modules with their own components, hooks, and logic.

**Characteristics**:

- 📦 Self-contained feature modules
- 🎯 Business logic encapsulation
- 🔌 Clean public API via index.ts
- 🧩 Can use base layer components

**Structure**:

```
features/invoices/
├── components/          # Invoice-specific components
│   ├── InvoiceCard.tsx
│   └── InvoiceList.tsx
├── hooks/              # Invoice-specific hooks
│   └── useInvoices.ts
├── services/           # API services
│   └── invoice-Service.ts
├── types/              # Invoice types
│   └── invoice.ts
└── index.ts           # Public exports
```

### 3. App Layer (`/app`)

**Purpose**: Screen-level components and routing.

**Characteristics**:

- 🗺️ Uses Expo Router for navigation
- 📱 Composes features and base components
- 🎨 Minimal business logic
- 📊 Focus on layout and composition

---

## Key Technologies

### Core Stack

- **React Native** 0.81.4 - Mobile framework
- **TypeScript** 5.9.2 - Type safety
- **Expo** 54.0.10 - Development platform
- **Expo Router** 6.0.8 - File-based routing

### Styling

- **NativeWind** 4.1.23 - Tailwind CSS for React Native
- **Custom Theme System** - CSS variables for light/dark modes

### State Management

- **React Query** (@tanstack/react-query 5.81.2) - Server state
- **React Context** - Global client state
- **React Hook Form** 7.58.1 - Form state

### Validation

- **Zod** 3.25.67 - Schema validation

### Utilities

- **Day.js** 1.11.13 - Date manipulation
- **Expo Secure Store** - Secure storage

---

## Design Patterns

### 1. Component Composition

**Pattern**: Build complex UIs from simple, reusable components.

```tsx
// Base components
import { OView, OText, OButton, OCard } from '@/base/components';

// Compose into a feature component
function InvoiceCard({ invoice }) {
  return (
    <OCard variant="elevated">
      <OView className="flex-row justify-between">
        <OText className="text-lg font-bold">{invoice.title}</OText>
        <OBadge variant="success">{invoice.status}</OBadge>
      </OView>
      <OButton onPress={handleApprove}>Approve</OButton>
    </OCard>
  );
}
```

### 2. Custom Hooks for Logic Reuse

**Pattern**: Extract reusable logic into custom hooks.

```tsx
// Custom hook
function useInvoiceList(filters: FilterType) {
  const debouncedFilters = useDebounce(filters, 500);

  return useQuery({
    queryKey: ['invoices', debouncedFilters],
    queryFn: () => fetchInvoices(debouncedFilters),
  });
}

// Usage
function InvoiceListScreen() {
  const { data, isLoading, error } = useInvoiceList({ status: 'pending' });

  if (isLoading) return <OLoadingSpinner centered />;
  if (error) return <OErrorState message={error.message} />;

  return <InvoiceList invoices={data} />;
}
```

### 3. Consistent State Management

**Pattern**: Handle all possible states explicitly.

```tsx
function DataScreen() {
  const { data, isLoading, error } = useQuery(...);

  // Always handle: loading, error, empty, success
  if (isLoading) return <OLoadingSpinner centered />;
  if (error) return <OErrorState message={error.message} onRetry={refetch} />;
  if (!data?.length) return <OEmptyState title="No data" />;

  return <DataList data={data} />;
}
```

### 4. Theme-Aware Components

**Pattern**: Use theme system for consistent styling.

```tsx
import { useCSSVar, useIsDark } from '@/base/hooks';

function ThemedComponent() {
  const isDark = useIsDark();
  const primaryColor = useCSSVar('--color-primary-600');
  const backgroundColor = useCSSVar('--color-background');

  return (
    <OView style={{ backgroundColor }}>
      <OText style={{ color: primaryColor }}>Themed Text</OText>
    </OView>
  );
}
```

### 5. Form Handling with Validation

**Pattern**: Use React Hook Form with Zod for type-safe forms.

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <OTextInput name="email" label="Email" required />
      <OTextInput name="password" label="Password" secureTextEntry />
      <OButton onPress={methods.handleSubmit(onSubmit)}>Login</OButton>
    </FormProvider>
  );
}
```

### 6. API Integration Pattern

**Pattern**: Service layer with React Query.

```tsx
// Service
export const invoiceService = {
  getAll: () => httpClient.get<Invoice[]>('/invoices'),
  getById: (id: number) => httpClient.get<Invoice>(`/invoices/${id}`),
  create: (data: CreateInvoiceDTO) => httpClient.post('/invoices', data),
  approve: (id: number) => httpClient.post(`/invoices/${id}/approve`),
};

// Hook
export function useInvoices() {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: invoiceService.getAll,
  });
}

// Usage
function InvoicesScreen() {
  const { data: invoices } = useInvoices();
  return <InvoiceList invoices={invoices} />;
}
```

---

## Naming Conventions

### Components

- **Base Components**: Prefix with `O` (e.g., `OButton`, `OText`, `OCard`)
- **Feature Components**: Descriptive names (e.g., `InvoiceCard`, `UserAvatar`)
- **Screen Components**: Suffix with `Screen` (e.g., `InvoicesScreen`)

### Hooks

- **Base Hooks**: Generic names (e.g., `useDebounce`, `useTheme`)
- **Feature Hooks**: Prefix with `use` + feature (e.g., `useInvoices`, `useAuth`)

### Files

- **Components**: PascalCase (e.g., `OButton.tsx`, `InvoiceCard.tsx`)
- **Hooks**: camelCase (e.g., `useDebounce.ts`, `useInvoices.ts`)
- **Utils**: camelCase (e.g., `format.ts`, `validation.ts`)
- **Types**: PascalCase (e.g., `Invoice.ts`, `User.ts`)
- **Examples**: `*.example.tsx`

### Directories

- **Lowercase with hyphens**: `feature-name/`
- **Plural for collections**: `components/`, `hooks/`, `utils/`

---

## Code Style Guidelines

### TypeScript

```tsx
// ✅ DO: Use explicit types
interface UserProps {
  name: string;
  email: string;
  onPress: () => void;
}

function UserCard({ name, email, onPress }: UserProps) {
  // ...
}

// ❌ DON'T: Use implicit any
function UserCard(props) {
  // ...
}
```

### Component Structure

```tsx
// ✅ DO: Follow this order
import { ... } from 'react';
import { ... } from 'react-native';
import { ... } from '@/base/components';
import { ... } from '@/base/hooks';
import { ... } from './local-components';

// Types
interface Props {
  // ...
}

// Component
export function ComponentName({ prop1, prop2 }: Props) {
  // Hooks
  const theme = useTheme();
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Handlers
  const handlePress = () => {
    // ...
  };

  // Render
  return (
    <OView>
      {/* ... */}
    </OView>
  );
}
```

### Styling

```tsx
// ✅ DO: Use NativeWind classes + theme colors
<OView className="flex-1 p-4 rounded-lg" style={{ backgroundColor }}>
  <OText className="text-lg font-bold" style={{ color: textColor }}>
    Title
  </OText>
</OView>

// ❌ DON'T: Use hard-coded colors
<View style={{ backgroundColor: '#000000' }}>
  <Text style={{ color: '#FFFFFF' }}>Title</Text>
</View>
```

---

## Best Practices

### 1. Component Design

✅ **DO**:

- Keep components small and focused
- Use composition over complexity
- Extract reusable logic into hooks
- Document complex components
- Handle all states (loading, error, empty, success)

❌ **DON'T**:

- Create monolithic components
- Mix business logic with UI
- Repeat code across components
- Leave states unhandled

### 2. State Management

✅ **DO**:

- Use React Query for server state
- Use Context for global UI state
- Use local state for component-specific state
- Invalidate queries after mutations

❌ **DON'T**:

- Use Context for server state
- Over-use global state
- Forget to handle loading/error states

### 3. Performance

✅ **DO**:

- Use `React.memo` for expensive components
- Memoize callbacks with `useCallback`
- Memoize values with `useMemo`
- Use `FlatList` for long lists
- Implement pagination/infinite scroll

❌ **DON'T**:

- Render entire lists with `.map()`
- Create new objects/functions in render
- Over-optimize prematurely

### 4. Error Handling

✅ **DO**:

- Always catch errors in async operations
- Show user-friendly error messages
- Provide retry functionality
- Log errors for debugging

❌ **DON'T**:

- Ignore errors silently
- Show technical error messages to users
- Leave users stuck without recourse

## Migration Guide

### Moving Existing Code to Base Layer

1. **Identify Reusable Code**
   - Components used in multiple features
   - Generic hooks
   - Utility functions

2. **Extract to Base**

   ```bash
   # Move component
   mv components/ui/CustomButton.tsx base/components/ui/OButton.tsx

   # Update imports across codebase
   # From: import { CustomButton } from '@/components/ui/CustomButton'
   # To:   import { OButton } from '@/base/components'
   ```

3. **Remove Feature Dependencies**
   - Remove feature-specific imports
   - Make components generic
   - Accept props instead of using context

4. **Document**
   - Add JSDoc comments
   - Add usage examples
   - Update exports in index.ts

---

## Performance Considerations

### Lazy Loading

```tsx
// Lazy load heavy screens
const InvoiceDetailScreen = lazy(() => import('./InvoiceDetailScreen'));

// Use Suspense
<Suspense fallback={<OLoadingSpinner centered />}>
  <InvoiceDetailScreen />
</Suspense>;
```

### Memoization

```tsx
// Memoize expensive calculations
const sortedData = useMemo(() => data?.sort((a, b) => a.date - b.date), [data]);

// Memoize callbacks
const handlePress = useCallback(() => {
  console.log('Pressed');
}, []);
```

### List Optimization

```tsx
// Use FlatList with optimization props
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  removeClippedSubviews
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  windowSize={21}
/>
```

---

## Common Patterns & Recipes

### 1. Infinite Scroll List

```tsx
function InfiniteListScreen() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['items'],
    queryFn: ({ pageParam = 1 }) => fetchItems(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <OLoadingSpinner /> : null}
    />
  );
}
```

### 2. Optimistic Updates

```tsx
function useApproveInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => invoiceService.approve(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['invoices'] });

      // Snapshot previous value
      const previous = queryClient.getQueryData(['invoices']);

      // Optimistically update
      queryClient.setQueryData(['invoices'], (old: Invoice[]) =>
        old.map((inv) => (inv.id === id ? { ...inv, status: 'approved' } : inv)),
      );

      return { previous };
    },
    onError: (err, id, context) => {
      // Rollback on error
      queryClient.setQueryData(['invoices'], context?.previous);
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}
```

### 3. Multi-Step Form

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const methods = useForm();

  const onSubmitStep1 = (data) => {
    setStep(2);
  };

  const onSubmitStep2 = methods.handleSubmit(async (data) => {
    await submitForm(data);
  });

  return (
    <FormProvider {...methods}>
      {step === 1 && (
        <>
          <OTextInput name="name" label="Name" />
          <OButton onPress={methods.handleSubmit(onSubmitStep1)}>Next</OButton>
        </>
      )}
      {step === 2 && (
        <>
          <OTextInput name="email" label="Email" />
          <OButton onPress={onSubmitStep2}>Submit</OButton>
          <OButton variant="secondary" onPress={() => setStep(1)}>
            Back
          </OButton>
        </>
      )}
    </FormProvider>
  );
}
```

---

## Troubleshooting

### Common Issues

#### Import Errors

```bash
# Issue: Module not found
# Solution: Check babel.config.js for path aliases
{
  "plugins": [
    ["module-resolver", {
      "alias": {
        "@": "./",
        "@/base": "./base"
      }
    }]
  ]
}
```

#### Theme Not Applied

```tsx
// Issue: Components not using theme
// Solution: Ensure ThemeProvider wraps app
function App() {
  return (
    <ThemeProvider>
      {({ themeVars }) => (
        <View style={themeVars}>
          <YourApp />
        </View>
      )}
    </ThemeProvider>
  );
}
```

#### React Query Not Working

```tsx
// Issue: Queries not executing
// Solution: Wrap app in QueryClientProvider
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/base/api';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

---

## Resources

### Documentation

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [NativeWind Docs](https://www.nativewind.dev/)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Docs](https://zod.dev/)

### Internal Documentation

- `/base/README.md` - Base layer overview
- `/base/examples/README.md` - Example implementations
- Component files - Inline JSDoc documentation

---

## Contributing

### Adding to Base Layer

1. **Identify Reusable Code**
   - Is it used in multiple places?
   - Is it framework-agnostic?
   - Does it have clear boundaries?

2. **Create the Component/Hook/Utility**
   - Follow naming conventions
   - Add TypeScript types
   - Add JSDoc documentation
   - Add usage examples

3. **Add to Index**

   ```tsx
   // base/components/ui/index.ts
   export { ONewComponent } from './ONewComponent';
   ```

4. **Document**
   - Update this architecture doc if needed
   - Add example if complex

5. **Test**
   - Test the component/hook/utility
   - Test in multiple contexts

### Code Review Checklist

- [ ] Follows naming conventions
- [ ] Has TypeScript types
- [ ] Has JSDoc documentation
- [ ] Handles all states (loading, error, empty, success)
- [ ] Is theme-aware where applicable
- [ ] Has no feature dependencies (for base layer)
- [ ] Exports are added to index.ts
- [ ] Examples added if complex

---

## Conclusion

This architecture provides a solid foundation for building scalable, maintainable React Native applications. By following these patterns and conventions, you can:

- Build faster with reusable components
- Maintain consistency across the app
- Onboard new developers quickly
- Scale the codebase without complexity
- Ensure high code quality

For questions or suggestions, refer to the examples in `/base/examples/` or reach out to the team.

**Happy coding! 🚀**
