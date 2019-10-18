const http = require('http');
const fs = require('fs');


// Creating a simple server that transmits a .txt using a stream
const server = http.createServer(async (req, res) => {
  const stream = fs.createReadStream(__dirname + '/data.txt');
  stream.pipe(res)
});
server.listen(8000);

// There are 5 kinds of streams:
// readable, writable, duplex, transform, and "classic"

// Pipe
// All the different types of streams use `.pipe()` to pair inputs with outputs.
// 'pipe()' is just a function that takes a readable stream `src` and hooks the output to a destination writable stream 'dst'
// Example:
// src.pipe(dst)
// .pipe(dst) returns `dst`, so you can chain multiple `.pipe()` together
// Example:
// a.pipe(b).pipe(c).pipe(d);
