/**
 * server.js
 * Runs on Laptop #1 (the "receiver").
 * Listens for incoming system info reports from other machines on the
 * network and saves each one to a timestamped JSON file.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const REPORTS_DIR = path.join(__dirname, 'received-reports');

// Make sure the folder to store incoming reports exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR);
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/report') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const hostname = data.hostname || 'unknown-host';
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${hostname}_${timestamp}.json`;
        const filePath = path.join(REPORTS_DIR, filename);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log(`✅ Received report from "${hostname}" -> saved as ${filename}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Report received' }));
      } catch (err) {
        console.error('❌ Error processing report:', err.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid data received' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`📂 Reports will be saved to: ${REPORTS_DIR}`);
  console.log(`Waiting for incoming reports...\n`);
});