# Base Starter Project

A complete **Next.js** starter project with a comprehensive base layer of reusable components, hooks, and utilities.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
base-starter-project/
├── pages/                  # Next.js Pages Router
│   ├── _app.tsx          # Root app with providers
│   ├── index.tsx         # Home page
│   ├── components.tsx   # Component showcase
│   ├── theme.tsx        # Theme demo
│   └── 404.tsx          # 404 page
│
├── base/                   # 🎯 Reusable foundation layer
│   ├── components/        # 17+ UI components
│   ├── hooks/             # 7 custom hooks
│   ├── utils/             # 30+ utility functions
│   ├── theme/             # Theme configuration
│   ├── api/               # API utilities
│   ├── types/             # TypeScript types
│   ├── examples/          # Usage examples
│   └── docs/              # Documentation
│
├── providers/             # React context providers
│   ├── ThemeProvider.tsx  # Theme management
│   └── QueryClientProvider.tsx
│
├── assets/                # Static assets
│   └── images/           # App icons
│
├── package.json          # Dependencies
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS config
└── tsconfig.json        # TypeScript config
```

## ✨ What's Included

### Components (17+)
- **UI**: OButton, OText, OView, OCard, OIcon, OBadge, OSkeleton
- **Form**: OTextInput, OSwitch
- **Layout**: ScreenLayout
- **Feedback**: OLoadingSpinner, OEmptyState, OErrorState

### Hooks (7)
- `useCSSVar` - Access theme CSS variables
- `useTheme` - Theme management
- `useMounted` - Component mount tracking
- `useDebounce` - Value debouncing
- `useToggle` - Boolean state management
- `useKeyboard` - Keyboard tracking
- `useResponsive` - Responsive utilities

### Utils (30+)
- **Formatting**: currency, numbers, dates, file sizes
- **Strings**: capitalize, truncate, slugify, sanitize
- **Dates**: format, relative time, ranges
- **Validation**: email, phone, URL, password
- **Storage**: Cross-platform secure storage

### Theme System
- Light & dark modes
- 50+ CSS variables
- Automatic system preference detection
- Persistent theme storage

## 🎨 Usage Examples

### Import Components

```tsx
import { OButton, OText, OCard } from '@/base';

function MyPage() {
  return (
    <OCard variant="elevated">
      <OText className="text-lg font-bold">Hello World</OText>
      <OButton variant="primary" onClick={() => {}}>
        Click Me
      </OButton>
    </OCard>
  );
}
```

### Use Hooks

```tsx
import { useTheme, useCSSVar, OView, OText } from '@/base';

function ThemedComponent() {
  const { isDark, setTheme } = useTheme();
  const primaryColor = useCSSVar('--color-primary-600');
  
  return (
    <OView style={{ backgroundColor: primaryColor }}>
      <OText>Current mode: {isDark ? 'Dark' : 'Light'}</OText>
    </OView>
  );
}
```

### Use Utilities

```tsx
import { formatCurrency, formatDate, isEmail } from '@/base';

const price = formatCurrency(1234.56, 'USD'); // "$1,234.56"
const date = formatDate(new Date()); // "Oct 27, 2025"
const valid = isEmail('user@example.com'); // true
```

## 📖 Documentation

- **Architecture Guide**: `/base/docs/architecture.md`
- **Base Layer Overview**: `/base/README.md`
- **Examples**: `/base/examples/`

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler
```

## 🎯 Key Features

✅ **Next.js Pages Router** - File-based routing  
✅ **TypeScript** - Full type safety  
✅ **Tailwind CSS** - Utility-first styling  
✅ **React Query** - Server state management  
✅ **React Hook Form** - Form handling  
✅ **Zod** - Schema validation  
✅ **Theme System** - Dark/light modes  
✅ **50+ Components** - Ready to use  
✅ **Documentation** - Comprehensive guides  

## 📄 Pages

### Home Page (`/`)
Welcome page with project overview and quick start guide.

### Components Page (`/components`)
Showcase of all available base components with live examples.

### Theme Page (`/theme`)
Interactive theme switcher and color palette viewer.

## 🔧 Configuration

### Path Aliases

Already configured in `tsconfig.json`:

```tsx
import { OButton } from '@/base';
import { useTheme } from '@/providers';
```

### Theme Customization

Edit theme colors in `/base/theme/colors.ts`:

```typescript
export const lightThemeColors = {
  '--color-primary-600': '2 132 199', // Change primary color
  // ... other colors
};
```

### Adding New Components

1. Create component in `/base/components/`
2. Add TypeScript types
3. Add JSDoc documentation
4. Export from `/base/components/index.ts`
5. Use across your app

## 📦 Dependencies

### Core
- Next.js (latest)
- React 19.1.0
- TypeScript 5.9.2

### UI
- Tailwind CSS 3.4.17

### State Management
- React Query 5.81.2
- React Hook Form 7.58.1

### Utilities
- Zod 3.25.67 (validation)
- Day.js 1.11.13 (dates)

## 🚦 Getting Started Guide

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Explore the App**
   - Open `http://localhost:3000` in your browser

4. **Read Documentation**
   - Start with `/base/docs/architecture.md`
   - Check out `/base/examples/` for code samples

5. **Build Your Pages**
   - Use base components
   - Follow the patterns in examples
   - Extend as needed

## 📝 Next Steps

### Customize the Project
1. Update `package.json` with your app name
2. Replace placeholder icons in `/public/`
3. Modify theme colors in `/base/theme/colors.ts`
4. Add your own pages in `/pages/`

### Add Features
1. Create feature modules in `/features/` directory
2. Use base components and hooks
3. Follow the architecture patterns
4. See `/base/docs/architecture.md` for guidance

### Deploy
```bash
# Build for production
npm run build

# Start production server
npm start

# Or deploy to Vercel/Netlify
# Follow Next.js deployment guides
```

## 🤝 Contributing

This is a starter template. Customize it for your needs:

1. Add more base components as needed
2. Create feature-specific modules
3. Extend the theme system
4. Add more utilities and hooks

## 📄 License

MIT License - Feel free to use this starter for your projects!

## 💡 Tips

- **Always handle all states**: loading, error, empty, success
- **Use debouncing** for search inputs
- **Follow naming conventions**: Prefix base components with `O`
- **Read the docs**: Check `/base/docs/architecture.md`
- **Explore examples**: See `/base/examples/` for patterns

## 🆘 Troubleshooting

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Theme not working
Make sure `ThemeProvider` wraps your app in `pages/_app.tsx`

### Components not found
Check that path aliases are configured in `tsconfig.json`

## 📞 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [React Query Docs](https://tanstack.com/query/latest)

---

**Built with ❤️ using Next.js**

Start building amazing apps! 🚀

