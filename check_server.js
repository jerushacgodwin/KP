const http = require('http');

const req = http.get('http://localhost:3001/hr', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (chunk) => {
    // consume data
  });
  res.on('end', () => {
    console.log('No more data.');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});
