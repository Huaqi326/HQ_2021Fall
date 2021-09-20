const http = require('http');

const hostname = '127.0.0.1'; //ip address, 4 bytes, 0-255. represent this computer.
const port = 3000; //register os

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});