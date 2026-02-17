# Scripts

## clean-cache.js

Script to clean Next.js cache directories. This helps prevent stale file issues when files are moved or renamed.

### Usage

```bash
npm run clean
```

This will automatically clean:
- `.next` directory
- `.next/cache` directory  
- `node_modules/.cache` directory

### When to use

- After moving or renaming files
- When experiencing "Module not found" errors for deleted files
- Before building for production
- When Next.js seems to be using stale cache
