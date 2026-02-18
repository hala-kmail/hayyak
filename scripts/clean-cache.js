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
  
    return true;
  } catch (error) {
    console.error(`✗ Failed to delete ${dirPath}:`, error.message);
    return false;
  }
}



let deletedCount = 0;
cacheDirs.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (deleteDir(fullPath)) {
    deletedCount++;
  }
});


