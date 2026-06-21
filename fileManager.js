/**
 * fileManager.js
 * Provides CRUD (Create, Read, Update, Delete) operations on code files.
 * Uses Node's built-in 'fs' module — no external dependencies.
 * See readme.md for full documentation of code flow and strategy.
 */

const fs = require('fs');
const path = require('path');

// ---- CREATE: make a new file with given content ----
function createFile(filePath, content = '') {
  try {
    if (fs.existsSync(filePath)) {
      return { success: false, message: `File already exists: ${filePath}` };
    }
    fs.writeFileSync(filePath, content, 'utf8');
    return { success: true, message: `Created: ${filePath}` };
  } catch (err) {
    return { success: false, message: `Error creating file: ${err.message}` };
  }
}

// ---- READ: get the contents of a file ----
function readFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return { success: false, message: `File not found: ${filePath}` };
    }
    const content = fs.readFileSync(filePath, 'utf8');
    return { success: true, content };
  } catch (err) {
    return { success: false, message: `Error reading file: ${err.message}` };
  }
}

// ---- UPDATE: overwrite or append to a file ----
function updateFile(filePath, newContent, mode = 'overwrite') {
  try {
    if (!fs.existsSync(filePath)) {
      return { success: false, message: `File not found: ${filePath}` };
    }
    if (mode === 'append') {
      fs.appendFileSync(filePath, newContent, 'utf8');
    } else {
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
    return { success: true, message: `Updated (${mode}): ${filePath}` };
  } catch (err) {
    return { success: false, message: `Error updating file: ${err.message}` };
  }
}

// ---- DELETE: remove a file ----
function deleteFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return { success: false, message: `File not found: ${filePath}` };
    }
    fs.unlinkSync(filePath);
    return { success: true, message: `Deleted: ${filePath}` };
  } catch (err) {
    return { success: false, message: `Error deleting file: ${err.message}` };
  }
}

// ---- LIST: bonus helper, lists files in a directory ----
function listFiles(dirPath = '.') {
  try {
    const files = fs.readdirSync(dirPath);
    return { success: true, files };
  } catch (err) {
    return { success: false, message: `Error listing directory: ${err.message}` };
  }
}

module.exports = { createFile, readFile, updateFile, deleteFile, listFiles };