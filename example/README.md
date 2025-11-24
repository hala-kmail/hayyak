# Base Layer

This directory contains the foundational, reusable building blocks for the Next.js application.

## Purpose

The base layer provides:
- **Framework-agnostic** UI components that work across all screens
- **Reusable hooks** for common functionality
- **Utility functions** for data manipulation and formatting
- **Theme configuration** for consistent styling
- **API utilities** for data fetching and state management
- **Type definitions** for type safety
- **Example implementations** showing best practices

## Directory Structure

```
base/
├── components/         # Reusable UI components
│   ├── ui/            # Core UI elements (buttons, text, views, etc.)
│   ├── form/          # Form inputs and controls
│   ├── layout/        # Layout components (screens, containers, etc.)
│   └── feedback/      # User feedback components (toasts, modals, etc.)
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── theme/             # Theme configuration and styling
├── types/             # TypeScript type definitions
├── api/               # API client and data fetching utilities
├── examples/          # Usage examples and patterns
└── docs/              # Documentation
    └── architecture.md
```

## Getting Started

See `/base/docs/architecture.md` for detailed documentation on the architecture and patterns.

## Usage

Import components from the base layer:

```typescript
import { OButton, OText, OView } from '@/base/components/ui';
import { useTheme, useCSSVar } from '@/base/hooks';
import { formatCurrency, delay } from '@/base/utils';
```

## Contributing

When adding to the base layer:
1. Ensure components are framework-agnostic and reusable
2. Add TypeScript types for all exports
3. Document component props and usage
4. Add examples for complex components
5. Keep styling consistent with the theme system

