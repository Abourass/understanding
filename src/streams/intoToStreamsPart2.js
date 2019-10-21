/*
 *  Alright, so we've generated an absolutely swoll unit of a .txt! Let's serve this bad boy!
 */

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  fs.readFile("./big.txt", (err, data) => { // I mean we are using the async readFile, so it's not like we are blocking the event loop right?
    if (err) throw err; //                                    Nothing bad could happen, RIGHT?!?!

    res.end(data);
  });
});

server.listen(8000);

/*
 *  When I run this server I start out using 8.7mb of memory.
 *  Then I connect to it annnnnnndd...... 3.4gb of memory used. Well shit. That's not good.
 *  We basically just put the whole file into memory before we wrote our response object. Shit's not good.
 *  The HTTP response object (res) is also a writeable stream. This means we have a readable stream that represents the content of big.txt,
 *  so, we can just pipe those two on each other and achieve the same results without gobbling all of the RAM like a hungry goblin.
 */
