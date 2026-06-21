/**
 * toolkit.js
 * Main entry point. Combines:
 *   1. System information gathering (from sysinfo.js)
 *   2. CRUD operations demo on code files (from fileManager.js)
 * Run with: node toolkit.js
 * See readme.md for full documentation of code flow and strategy.
 */

const { collectSystemInfo } = require('./sysinfo.js');
const { createFile, readFile, updateFile, deleteFile, listFiles } = require('./fileManager.js');

function printSection(title) {
  console.log('\n========================================');
  console.log(` ${title}`);
  console.log('========================================');
}

// ---- PART 1: Display system information ----
function runSystemInfo() {
  printSection('SYSTEM INFORMATION');
  const info = collectSystemInfo();
  console.log(JSON.stringify(info, null, 2));
  return info;
}

// ---- PART 2: Demonstrate CRUD operations on a sample code file ----
function runCrudDemo() {
  printSection('CRUD OPERATIONS DEMO');

  const demoFilePath = path_join('demo-sample.js');

  // CREATE
  const createResult = createFile(
    demoFilePath,
    "// Sample file created automatically\nconsole.log('Hello from demo-sample.js');\n"
  );
  console.log('CREATE ->', createResult.message);

  // READ
  const readResult = readFile(demoFilePath);
  if (readResult.success) {
    console.log('READ -> Contents:\n' + readResult.content);
  } else {
    console.log('READ ->', readResult.message);
  }

  // UPDATE
  const updateResult = updateFile(
    demoFilePath,
    "\nconsole.log('This line was added by UPDATE');\n",
    'append'
  );
  console.log('UPDATE ->', updateResult.message);

  // READ again to show the update worked
  const readAfterUpdate = readFile(demoFilePath);
  if (readAfterUpdate.success) {
    console.log('READ (after update) -> Contents:\n' + readAfterUpdate.content);
  }

  // LIST files in current directory
  const listResult = listFiles('.');
  if (listResult.success) {
    console.log('LIST -> Files in current directory:', listResult.files);
  }

  // DELETE
  const deleteResult = deleteFile(demoFilePath);
  console.log('DELETE ->', deleteResult.message);
}

// Small helper since we don't import 'path' separately here
function path_join(filename) {
  return filename; // relative to current working directory
}

// ---- Entry point ----
function main() {
  const systemInfo = runSystemInfo();
  runCrudDemo();

  printSection('DONE');
  console.log('Toolkit run complete.\n');
}

main();