---
name: Convert Project from React Native/Expo to Next.js
overview: ""
todos:
  - id: 9ac966e9-8375-48b7-8f6f-83d906bc9178
    content: Update index.ts files with Next.js examples in JSDoc comments
    status: pending
isProject: false
---

# Convert Project from React Native/Expo to Next.js

## Overview

Convert all documentation files and code examples/implementations from React Native + Expo to Next.js Pages Router with web HTML equivalents.

## Scope

- **Documentation**: All 14 .md files across the project
- **Code Examples**: All example files in `base-starter-project/base/examples/` and `example/examples/`
- **Implementation Files**: All components, hooks, and utils in both `base-starter-project/base/` and `example/` directories

## Key Conversions

### Component Conversions

- `View` → `div`
- `Text` → `span` or `p`
- `TouchableOpacity` → `button` or `div` with onClick
- `TextInput` → `input`
- `FlatList` → `div` with `.map()`
- `ScrollView` → `div` with `overflow-y-auto`
- `SafeAreaView` → `div` with CSS padding
- `ActivityIndicator` → CSS spinner or loading component
- `RefreshControl` → Manual refresh button or React Query refetch

### API Conversions

- `onPress` → `onClick`
- `onChangeText` → `onChange` with `e.target.value`
- `Keyboard` API → `window`/`document` events or remove
- `Platform.OS` → Browser detection or remove
- `AsyncStorage`/`expo-secure-store` → `localStorage`
- React Native `style` prop → CSS classes/Tailwind

### Framework Conversions

- Expo Router → Next.js Pages Router
- React Native → Next.js with web components
- NativeWind → Tailwind CSS (keep, but adjust for web)

## Implementation Steps

### Phase 1: Documentation Files (14 files)

1. Update root `README.md` - Remove GitLab template, add Next.js project info
2. Update `base-starter-project/README.md` - Convert from React Native/Expo to Next.js
3. Update `base-starter-project/SETUP.md` - Convert setup instructions for Next.js
4. Update `base-starter-project/base/README.md` - Update framework references
5. Update `base-starter-project/base/docs/architecture.md` - Convert architecture guide
6. Update `base-starter-project/base/examples/README.md` - Update example docs
7. Update `base-starter-project/assets/images/README.md` - Update asset references
8. Update `example/README.md` - Convert to Next.js
9. Update `example/docs/architecture.md` - Convert architecture guide
10. Update `example/examples/README.md` - Update example docs
11. Update `BASE_LAYER_COMPLETE.md` - Convert completion doc
12. Update `BASE_LAYER_SUMMARY.md` - Convert summary doc
13. Update `BASE_STARTER_PROJECT_COMPLETE.md` - Convert completion doc
14. Update `COMPLETE_DELIVERABLES.md` - Convert deliverables doc

### Phase 2: Code Examples (10 files)

1. `base-starter-project/base/examples/ListScreen.example.tsx`
2. `base-starter-project/base/examples/FormScreen.example.tsx`
3. `base-starter-project/base/examples/DetailScreen.example.tsx`
4. `base-starter-project/base/examples/ThemeUsage.example.tsx`
5. `example/examples/ListScreen.example.tsx`
6. `example/examples/FormScreen.example.tsx`
7. `example/examples/DetailScreen.example.tsx`
8. `example/examples/ThemeUsage.example.tsx`

### Phase 3: Base Components (13 files)

1. `base-starter-project/base/components/ui/OView.tsx` - View → div
2. `base-starter-project/base/components/ui/OText.tsx` - Text → span/p
3. `base-starter-project/base/components/ui/OButton.tsx` - TouchableOpacity → button
4. `base-starter-project/base/components/ui/OCard.tsx` - View → div
5. `base-starter-project/base/components/ui/OIcon.tsx` - Update for web
6. `base-starter-project/base/components/ui/OBadge.tsx` - View → div
7. `base-starter-project/base/components/ui/OSkeleton.tsx` - View → div
8. `base-starter-project/base/components/form/OTextInput.tsx` - TextInput → input
9. `base-starter-project/base/components/form/OSwitch.tsx` - Switch → input type="checkbox"
10. `base-starter-project/base/components/layout/ScreenLayout.tsx` - SafeAreaView → div
11. `base-starter-project/base/components/feedback/OLoadingSpinner.tsx` - ActivityIndicator → CSS spinner
12. `base-starter-project/base/components/feedback/OEmptyState.tsx` - View → div
13. `base-starter-project/base/components/feedback/OErrorState.tsx` - View → div

### Phase 4: Hooks (7 files)

1. `base-starter-project/base/hooks/useKeyboard.ts` - Convert to web keyboard events or remove
2. `base-starter-project/base/hooks/useResponsive.ts` - Update for web breakpoints
3. Other hooks (useTheme, useCSSVar, useDebounce, useToggle, useMounted) - Review and update if needed

### Phase 5: Utils (7 files)

1. `base-starter-project/base/utils/storage.ts` - Remove Platform.OS, use localStorage only
2. Other utils (format, string, date, validation, delay) - Review for web compatibility

### Phase 6: Other Files

1. `base-starter-project/base/index.ts` - Update example code in JSDoc
2. `example/index.ts` - Update example code in JSDoc
3. Update any app-level files if they exist

## Files to Update

### Documentation (14 files)

- `/README.md`
- `/base-starter-project/README.md`
- `/base-starter-project/SETUP.md`
- `/base-starter-project/base/README.md`
- `/base-starter-project/base/docs/architecture.md`
- `/base-starter-project/base/examples/README.md`
- `/base-starter-project/assets/images/README.md`
- `/example/README.md`
- `/example/docs/architecture.md`
- `/example/examples/README.md`
- `/BASE_LAYER_COMPLETE.md`
- `/BASE_LAYER_SUMMARY.md`
- `/BASE_STARTER_PROJECT_COMPLETE.md`
- `/COMPLETE_DELIVERABLES.md`

### Code Examples (8 files)

- `/base-starter-project/base/examples/*.example.tsx` (4 files)
- `/example/examples/*.example.tsx` (4 files)

### Implementation Files (~30+ files)

- All component files in `/base-starter-project/base/components/`
- All hook files in `/base-starter-project/base/hooks/`
- All util files in `/base-starter-project/base/utils/`
- Similar files in `/example/` directory

## Notes

- Keep Tailwind CSS classes (they work for web)
- Remove all React Native imports
- Convert all event handlers (onPress → onClick, onChangeText → onChange)
- Update all code examples in JSDoc comments
- Ensure all components use standard HTML elements
- Update routing references from Expo Router to Next.js Pages Router