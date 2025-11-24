# Base Layer Examples

This directory contains example implementations demonstrating best practices and common patterns using the base layer components, hooks, and utilities.

## Examples Overview

### 1. ListScreen.example.tsx
**Purpose:** Demonstrates list rendering with data fetching

**Key Features:**
- React Query integration for data fetching
- Loading states with spinners
- Error handling with retry functionality
- Empty states with call-to-action
- Manual refresh functionality
- Search functionality with debouncing
- List rendering optimization

**Use Cases:**
- Product listings
- User directories
- Transaction history
- Any list-based screen

---

### 2. FormScreen.example.tsx
**Purpose:** Shows comprehensive form handling

**Key Features:**
- React Hook Form integration
- Zod schema validation
- Form inputs (text, password, multiline, switch)
- Loading states during submission
- Error handling and success feedback
- Form reset functionality

**Use Cases:**
- User registration
- Profile editing
- Data entry forms
- Settings screens

---

### 3. DetailScreen.example.tsx
**Purpose:** Demonstrates detail view with actions

**Key Features:**
- Single item data fetching
- Loading skeletons for better UX
- Status badges
- Formatted data display (currency, dates)
- Action buttons (approve/reject)
- Mutation handling with optimistic updates

**Use Cases:**
- Invoice details
- User profiles
- Item inspection
- Approval workflows

---

### 4. ThemeUsage.example.tsx
**Purpose:** Shows theme system usage

**Key Features:**
- Theme switching (light/dark/system)
- CSS variable access
- Theme-aware components
- Color palette demonstration
- Dynamic styling based on theme

**Use Cases:**
- Settings screens
- Theme customization
- Any screen requiring theme awareness

---

## How to Use These Examples

### 1. Copy and Adapt
Copy the example code to your screen and adapt it to your specific needs:

```tsx
import { ListScreenExample } from '@/base/examples/ListScreen.example';

// Use directly or customize
export default function MyListPage() {
  return <ListScreenExample />;
}
```

### 2. Learn Patterns
Study the examples to understand:
- Component composition
- Hook usage
- Error handling patterns
- Loading state management
- API integration

### 3. Extract Reusable Logic
Identify common patterns and extract them into custom hooks:

```tsx
// Custom hook inspired by examples
function useItemList(filters: FilterType) {
  const debouncedFilters = useDebounce(filters, 500);
  
  return useQuery({
    queryKey: ['items', debouncedFilters],
    queryFn: () => fetchItems(debouncedFilters),
  });
}
```

## Common Patterns Demonstrated

### Data Fetching with React Query
```tsx
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['items'],
  queryFn: fetchItems,
});
```

### Form Handling with Validation
```tsx
const methods = useForm<FormData>({
  resolver: zodResolver(schema),
});

const onSubmit = methods.handleSubmit((data) => {
  // Handle submission
});
```

### Loading States
```tsx
if (isLoading) return <OLoadingSpinner centered />;
if (error) return <OErrorState message={error.message} onRetry={refetch} />;
if (!data?.length) return <OEmptyState title="No data" />;
```

### Mutations with Feedback
```tsx
const mutation = useMutation({
  mutationFn: submitData,
  onSuccess: () => {
    // Show success message (use toast/notification library)
    queryClient.invalidateQueries(['items']);
  },
  onError: (error) => {
    // Show error message (use toast/notification library)
    console.error('Error:', error.message);
  },
});
```

## Best Practices

1. **Always Handle All States**
   - Loading
   - Error
   - Empty
   - Success

2. **Use Debouncing for Search**
   ```tsx
   const debouncedSearch = useDebounce(searchTerm, 500);
   ```

3. **Invalidate Queries After Mutations**
   ```tsx
   queryClient.invalidateQueries({ queryKey: ['items'] });
   ```

4. **Provide User Feedback**
   - Loading indicators
   - Success messages
   - Error alerts

5. **Keep Components Focused**
   - Separate concerns
   - Extract complex logic into hooks
   - Use composition over complexity

## Next Steps

1. Review each example
2. Understand the patterns
3. Adapt to your use cases
4. Create your own examples
5. Share back improvements

## Questions?

Refer to:
- `/base/docs/architecture.md` for overall structure
- Component files for detailed API documentation
- Hook files for usage examples

