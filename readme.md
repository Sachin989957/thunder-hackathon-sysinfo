<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-blue?style=for-the-badge)
![Hackathon](https://img.shields.io/badge/⚡_Thunder_Hackathon-Submission-purple?style=for-the-badge)

<!-- ### 🏆 Built for **Thunder Hackathon** -->

</div>

---

## ✨ What This Does

🔍 **Collects** live system information — OS, CPU, hostname, Node.js version, user details, and environment variables
📦 **Outputs** in two formats — human-readable console report or structured JSON
🛠️ **Performs CRUD** — Create, Read, Update, Delete, and List operations on code files
🛡️ **Never crashes** — every value gracefully falls back to `'N/A'` if missing or inaccessible

---

## 🚀 Quick Start

```bash
# 📋 Human-readable system report only
node sysinfo.js

# 🧾 Structured JSON output only
node sysinfo.js --json

# 💾 Save JSON output to a file
node sysinfo.js --json > report.json

# 🎯 Full toolkit: system info + CRUD demo, all in one run
node toolkit.js
```

---

## 📁 Project Structure

---

## 📊 What Gets Collected

| Category | Field | Node.js API Used |
|---|---|---|
| 🖥️ Operating System | Type | `os.type()` |
| | Platform | `os.platform()` |
| | Release | `os.release()` |
| | Version | `os.version()` |
| ⚙️ CPU | Architecture | `os.arch()` |
| | Core count | `os.cpus().length` |
| | Model name | `os.cpus()[0].model` |
| 🌐 Hostname | Machine name | `os.hostname()` |
| 🟢 Node.js | Runtime version | `process.version` |
| | Executable path | `process.execPath` |
| 👤 User | Home directory | `os.homedir()` |
| | Username | `os.userInfo().username` |
| 💾 Memory | Total RAM | `os.totalmem()` |
| | Free RAM | `os.freemem()` |
| 🔐 Environment | Selected variables | `process.env` (curated allowlist) |
| ⏱️ Metadata | Collection timestamp | `new Date().toISOString()` |

> Every value is read fresh on every run (no caching) — the report always reflects the live state of the machine.

---

## 🛠️ CRUD Operations (`fileManager.js`)

| Operation | Function | Description |
|---|---|---|
| 🆕 **Create** | `createFile(path, content)` | Creates a new file. Fails safely if it already exists. |
| 📖 **Read** | `readFile(path)` | Reads file contents. Fails safely if not found. |
| ✏️ **Update** | `updateFile(path, content, mode)` | Overwrites or appends. `mode`: `'overwrite'` or `'append'`. |
| 🗑️ **Delete** | `deleteFile(path)` | Deletes a file. Fails safely if not found. |
| 📋 **List** | `listFiles(dirPath)` | Lists all files/folders in a directory. |

Every function returns a consistent result object — `{ success: true/false, message/content }` — so errors are handled as data, never thrown exceptions.

### 🎯 How `toolkit.js` demonstrates CRUD

Running `node toolkit.js` automatically:

1. 🖥️ Prints full system information
2. 🆕 Creates a sample file (`demo-sample.js`)
3. 📖 Reads its contents back
4. ✏️ Appends a new line (update)
5. 📖 Reads it again to confirm the change
6. 📋 Lists all files in the current directory
7. 🗑️ Deletes the sample file (cleanup)

---

## 🏆 Evaluation Criteria Breakdown

### 1️⃣ Correctness of Information Gathering
Every data point is sourced directly from Node's official built-in APIs — no guessing, no third-party data, no hardcoded values. Values are read live on every execution.

### 2️⃣ Code Quality, Organization & Innovation
- 🧩 **Modular architecture** — split across `sysinfo.js`, `fileManager.js`, and `toolkit.js` by responsibility
- 🔄 **Separation of data from presentation** — collection logic never touches `console.log` directly
- 🎛️ **Dual output mode** via `--json` flag, with zero duplicated logic
- ♻️ **Reusable & importable** — `require.main === module` guard means `sysinfo.js` works standalone *and* as an importable module
- 🪶 **Zero dependencies** — pure Node.js built-ins only (`os`, `process`, `fs`)

### 3️⃣ Error Handling
- 🛡️ `safe(fn, fallback)` wrapper catches any failed/undefined system call
- 🔢 Type-checked memory formatting (no `NaN GB`)
- 📐 Predictable, consistent output shape across all platforms
- ✅ Every CRUD function checks file existence before acting and never throws

### 4️⃣ Documentation & Explanation
- 💬 Every function is commented with its purpose
- 📘 This README explains *what*, *how*, and *why* for every design decision

### 5️⃣ Output Formatting
- 📋 Clean, sectioned console reports
- 🧾 Pretty-printed JSON (`JSON.stringify(data, null, 2)`)
- 🪜 Step-by-step labeled CRUD logs (`CREATE ->`, `READ ->`, etc.)

---

## 🔒 Privacy Note

Only a curated allowlist of environment variables is collected:
`PATH`, `HOME`, `USERPROFILE`, `USER`, `USERNAME`, `OS`, `SHELL`, `LANG`, `TEMP`, `TMP`, `NODE_ENV`

The full `process.env` is **never** dumped, since it can contain API keys, tokens, or other secrets.

---

<div align="center">

Build for 💻 Thunder Hackhathon 🏆 .

</div>