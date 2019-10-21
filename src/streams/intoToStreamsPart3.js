/*
 *  Node's fs module can give us a readable stream for any file using the createReadStream method. We can pipe that to the response object
 */

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  const src = fs.createReadStream("./big.txt");
  src.pipe(res);
});

server.listen(8000);

// And this time we are able to stream that big boy while only incurring at 25mb RAM penalty. Boom. Power of streams, baby.
