const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

// Middleware and route setup
// ...

// Load the SSL certificates
const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};

// Start the server
https.createServer(options, app).listen(443, () => {
  console.log('Server running on port 443 (HTTPS)');
});
