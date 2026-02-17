#!/usr/bin/env node

/**
 * Script to clean Next.js cache
 * Works on both Windows and Unix systems
 */

const fs = require('fs');
const path = require('path');

const cacheDirs = ['.next', '.next/cache', 'node_modules/.cache'];

function deleteDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }

  try {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✓ Deleted: ${dirPath}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to delete ${dirPath}:`, error.message);
    return false;
  }
}

console.log('🧹 Cleaning Next.js cache...\n');

let deletedCount = 0;
cacheDirs.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (deleteDir(fullPath)) {
    deletedCount++;
  }
});

if (deletedCount > 0) {
  console.log(`\n✅ Successfully cleaned ${deletedCount} cache directory/directories`);
} else {
  console.log('\n✨ Cache directories are already clean');
}
