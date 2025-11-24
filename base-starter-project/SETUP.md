# Setup Guide - Base Starter Project

Complete step-by-step guide to get the project running.

## 📋 Prerequisites

Before you begin, ensure you have:

### Required
- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **Git** (for cloning)

### Optional but Recommended
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Check Your Installation

```bash
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 8.0.0 or higher
```

---

## 🚀 Installation Steps

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd base-starter-project

# Install all dependencies
npm install

# This will install:
# - Next.js
# - React
# - TypeScript
# - Tailwind CSS
# - React Query
# - All other dependencies
```

**Expected time**: 2-5 minutes depending on your internet connection.

### Step 2: Verify Installation

```bash
# Check if installation was successful
npm list next
npm list react

# Should show installed versions without errors
```

### Step 3: Start Development Server

```bash
# Start Next.js development server
npm run dev
```

You should see the server starting on `http://localhost:3000`.

### Step 4: Open in Browser

Open your browser and visit:
```
http://localhost:3000
```

The app should load automatically.

---

## 🎯 Post-Installation Setup

### 1. Configure App Identity

Edit `package.json`:

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "description": "Your App Description"
}
```

### 2. Add App Icons

Place your app icons in `public/`:

- `favicon.ico` - Website favicon
- `icon.png` - App icon (various sizes)
- `apple-icon.png` - Apple touch icon

**Quick way to generate icons**:
1. Create one 1024x1024 icon
2. Use https://realfavicongenerator.net/ to generate all sizes
3. Download and place in `public/`

### 3. Customize Theme (Optional)

Edit `/base/theme/colors.ts` to change your app's color scheme:

```typescript
export const lightThemeColors = {
  '--color-primary-600': '2 132 199', // Your brand color
  // ... customize other colors
};
```

### 4. Test the App

1. Navigate through all three pages:
   - **Home** (`/`) - Welcome page
   - **Components** (`/components`) - Component showcase
   - **Theme** (`/theme`) - Theme switcher

2. Test theme switching in the Theme page

3. Test component interactions in Components page

---

## 🛠️ Development Workflow

### Running the App

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality Checks

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Making Changes

1. Edit files in `/pages/` for pages
2. Edit files in `/base/` for reusable components
3. Changes hot-reload automatically
4. Check terminal for errors

---

## 🌐 Browser Support

Next.js works in all modern browsers:

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

No additional setup required!

---

## 🔧 Troubleshooting

### Issue: "Module not found" errors

**Solution**:
```bash
# Clear all caches
rm -rf node_modules .next
npm install
npm run dev
```

### Issue: Build errors

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

### Issue: Theme not working

**Check**:
1. `ThemeProvider` wraps app in `pages/_app.tsx`
2. Components imported from `@/base`
3. `global.css` imported in `_app.tsx`

### Issue: "Unable to resolve module"

**Solution**:
1. Check import paths use `@/base` alias
2. Verify `tsconfig.json` has paths configured
3. Restart dev server: `npm run dev`

### Issue: Port 3000 already in use

**Solution**:
```bash
# Use a different port
npm run dev -- -p 3001
```

---

## 📚 Next Steps

### Learn the Codebase

1. **Read Architecture Doc**: `/base/docs/architecture.md`
2. **Study Examples**: `/base/examples/`
3. **Explore Components**: Open Components tab in app

### Start Building

1. Create new page in `/pages/`
2. Use base components: `import { OButton } from '@/base'`
3. Follow patterns from example pages

### Add Features

1. Create feature modules in `/features/` directory
2. Use base layer for UI
3. Keep business logic separate

---

## 🎓 Learning Resources

### Official Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Tutorials
- [Next.js Tutorial](https://nextjs.org/learn)
- [React Tutorial](https://react.dev/learn)

### Community
- [Next.js Discussions](https://github.com/vercel/next.js/discussions)
- [React Community](https://react.dev/community)

---

## ✅ Verification Checklist

Before you start developing:

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] App runs with `npm run dev`
- [ ] Can view app in browser at `http://localhost:3000`
- [ ] All three pages working
- [ ] Theme switching works
- [ ] No errors in terminal
- [ ] Read architecture documentation
- [ ] Explored example code

---

## 🆘 Getting Help

If you're stuck:

1. **Check this guide** - Read the troubleshooting section
2. **Check terminal** - Look for error messages
3. **Check Next.js docs** - https://nextjs.org/docs
4. **Clear caches** - `rm -rf .next node_modules && npm install`
5. **Reinstall** - Delete `node_modules` and reinstall

---

## 🎉 You're Ready!

Your development environment is now set up. Time to build something amazing!

**Quick test**:
```bash
npm run dev
# Visit http://localhost:3000
# Navigate to Components page
# Try Theme switcher
```

If everything works, you're all set! 🚀

---

**Happy coding!** 💻

