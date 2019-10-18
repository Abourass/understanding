/*
 TO RUN THIS EXAMPLE YOU MUST OPEN THIS FOLDER IN TERMINAL THEN RUN THE FOLLOWING COMMAND
 echo saljdsaljdalsjlajsdlkajsdlakjdslakjda | node consumingReadStreams.js
 */

// Consuming a Readable Stream
// Most of the time it's much easier to just pipe a readable stream into another kind of stream or a stream
// created with a module like `through` or `concat-stream`, but occasionally it might be useful to consume a readable stream directly.
process.stdin.on('readable', function(){
  const buffer = process.stdin.read();
  console.dir(buffer)
});
/*
Output of running the line shown at the top of this file:
Buffer [Uint8Array] [
  115,  97, 108, 106, 100, 115,  97, 108,
  106, 100,  97, 108, 115, 106, 108,  97,
  106, 115, 100, 108, 107,  97, 106, 115,
  100, 108,  97, 107, 106, 100, 115, 108,
   97, 107, 106, 100,  97,  10
]
null
 */

// When data is available, the 'readable' event fires, and you can call .read() to fetch some data from the buffer.
// When the stream is finished, .read() returns null because there are no more bytes to fetch.
// You can also tell .read(n) to return n bytes of data. Reading a number of bytes is merely
// advisory and does not work for object streams, but all the core streams support it.
