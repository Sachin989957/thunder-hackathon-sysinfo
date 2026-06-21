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
sysinfo/

├── 📄 sysinfo.js       → System info collection (OS, CPU, memory, env vars, etc.)

├── 🛠️ fileManager.js   → CRUD operations on files (Create, Read, Update, Delete, List)

├── 🎯 toolkit.js        → Main entry point — collects info, runs CRUD demo, sends report

├── 📡 server.js         → Receiver server — accepts reports over HTTP and saves them

└── 📘 readme.md         → You are here
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

## 📡 Network Reporting — Send Info to a Remote Server

Beyond local CRUD operations, this toolkit can **send the collected system
report to a remote server over HTTP** — even across different networks —
using a simple client-server setup.

### How it works

1. **`server.js`** runs on the "receiver" machine. It starts a lightweight
   HTTP server (Node's built-in `http` module — no frameworks) that listens
   for incoming `POST /report` requests and saves each one as a timestamped
   JSON file inside `received-reports/`.

2. **`toolkit.js`** runs on the "sender" machine. After collecting system
   info and running the CRUD demo, it automatically sends the report to
   the server's URL via an HTTPS POST request.

3. **[ngrok](https://ngrok.com)** is used to expose the receiver's local
   server to the public internet with a temporary HTTPS URL — so sender
   and receiver don't need to be on the same WiFi/network.

### Running it yourself

**On the receiver machine:**
```bash
# Terminal 1 — start the server
node server.js

# Terminal 2 — expose it publicly via ngrok
ngrok http 3000
```
Copy the `https://xxxx.ngrok-free.app` URL ngrok gives you.

**On the sender machine**, paste that URL into the `SERVER_URL` constant
near the top of `toolkit.js`, then run:
```bash
node toolkit.js
```

The receiver's terminal logs each incoming report, and a new file appears
in `received-reports/` containing that machine's full system info —
proving the report was successfully transmitted across networks.

### Why this design

- **No external HTTP libraries** — built using Node's native `http`/`https`
  modules, keeping the project fully dependency-free.
- **Fails safely** — if the server is unreachable, `toolkit.js` logs a
  clear error (`❌ Failed to send report to server`) instead of crashing.
- **Each report is timestamped and hostname-tagged**, so the receiver can
  track which machine sent what, and when.

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