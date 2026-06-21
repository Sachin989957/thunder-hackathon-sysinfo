/**
 * sysinfo.js
 * Collects and displays system information using Node.js built-in modules.
 * See readme.md for full documentation of code flow and strategy.
 */

const os = require('os');
const process = require('process');

// ---- Safe getter: runs a function, returns fallback if it throws or returns undefined ----
function safe(fn, fallback = 'N/A') {
  try {
    const result = fn();
    return (result === undefined || result === null) ? fallback : result;
  } catch (err) {
    return fallback;
  }
}

// ---- Helper: format bytes into human-readable form ----
function formatBytes(bytes) {
  if (typeof bytes !== 'number' || isNaN(bytes)) return 'N/A';
  const gb = bytes / (1024 ** 3);
  return `${gb.toFixed(2)} GB`;
}

// ---- Collect environment variables (only a safe, useful subset) ----
function getSelectedEnvVars() {
  const keysToShow = [
    'PATH',
    'HOME',
    'USERPROFILE',
    'USER',
    'USERNAME',
    'OS',
    'SHELL',
    'LANG',
    'TEMP',
    'TMP',
    'NODE_ENV',
  ];

  const selected = {};
  for (const key of keysToShow) {
    selected[key] = process.env[key] !== undefined ? process.env[key] : 'N/A';
  }
  return selected;
}

// ---- Main info collector ----
function collectSystemInfo() {
  return {
    operatingSystem: {
      type: safe(() => os.type()),
      platform: safe(() => os.platform()),
      release: safe(() => os.release()),
      version: safe(() => os.version()),
    },
    cpu: {
      architecture: safe(() => os.arch()),
      cores: safe(() => os.cpus().length, 0),
      model: safe(() => os.cpus()[0].model),
    },
    hostname: safe(() => os.hostname()),
    node: {
      version: safe(() => process.version),
      execPath: safe(() => process.execPath),
    },
    user: {
      homeDirectory: safe(() => os.homedir()),
      username: safe(() => os.userInfo().username),
    },
    memory: {
      total: formatBytes(safe(() => os.totalmem(), null)),
      free: formatBytes(safe(() => os.freemem(), null)),
    },
    environmentVariables: getSelectedEnvVars(),
    collectedAt: new Date().toISOString(),
  };
}

// ---- Pretty print to console (human-readable format) ----
function printSystemInfo(info) {
  console.log('========================================');
  console.log('         SYSTEM INFORMATION REPORT       ');
  console.log('========================================\n');

  console.log('--- Operating System ---');
  console.log(`Type:     ${info.operatingSystem.type}`);
  console.log(`Platform: ${info.operatingSystem.platform}`);
  console.log(`Release:  ${info.operatingSystem.release}`);
  console.log(`Version:  ${info.operatingSystem.version}`);

  console.log('\n--- CPU ---');
  console.log(`Architecture: ${info.cpu.architecture}`);
  console.log(`Cores:        ${info.cpu.cores}`);
  console.log(`Model:        ${info.cpu.model}`);

  console.log('\n--- Hostname ---');
  console.log(info.hostname);

  console.log('\n--- Node.js ---');
  console.log(`Version:   ${info.node.version}`);
  console.log(`Exec Path: ${info.node.execPath}`);

  console.log('\n--- User ---');
  console.log(`Home Directory: ${info.user.homeDirectory}`);
  console.log(`Username:       ${info.user.username}`);

  console.log('\n--- Memory ---');
  console.log(`Total: ${info.memory.total}`);
  console.log(`Free:  ${info.memory.free}`);

  console.log('\n--- Selected Environment Variables ---');
  for (const [key, value] of Object.entries(info.environmentVariables)) {
    console.log(`${key}=${value}`);
  }

  console.log(`\nCollected At: ${info.collectedAt}`);
  console.log('\n========================================\n');
}

// ---- Entry point ----
function main() {
  const args = process.argv.slice(2);
  const wantsJson = args.includes('--json');

  const systemInfo = collectSystemInfo();

  if (wantsJson) {
    console.log(JSON.stringify(systemInfo, null, 2));
  } else {
    printSystemInfo(systemInfo);
  }
}

// Only auto-run if this file is executed directly (e.g. `node sysinfo.js`)
// — NOT when it's imported with require() by another file like toolkit.js
if (require.main === module) {
  main();
}

// Export for reuse in other scripts/tests
module.exports = { collectSystemInfo };