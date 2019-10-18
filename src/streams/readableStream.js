// Readable Streams
// Readable Streams produce data that can be fed into a writeable, transform, or duplex stream by calling .pipe() -> readableStream.pipe(dst)
const Readable = require('stream').Readable;
const cli = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const fs = require('fs');
const nerds = require('nerds');
/*
const readableStream = new Readable;
readableStream.push('beep ');
readableStream.push('boop \n');
readableStream.push(null);
readableStream.pipe(process.stdout);

// rs.push(null) tells the consumer that rs is done outputting data.
// Note here that we pushed content to the readable stream rs before piping to process.stdout, but the complete message was still written.
// This is because when you .push() to a readable stream, the chunks you push are buffered until a consumer is ready to read them.
// However, it would be even better in many circumstances if we could avoid buffering data altogether and only generate the data when the consumer asks for it.
// We can push chunks on-demand by defining a ._read function:
const correctStream = new Readable;

let count = 97;
correctStream._read = function () {
  correctStream.push(String.fromCharCode(count++));
  if (count > 'z'.charCodeAt(0)){ correctStream.push(null) }
};
correctStream.pipe(process.stdout); // abcdefghijklmnopqrstuvwxyz

// Here we push the letters 'a' through 'z', inclusive, but only when the consumer is ready to read them.
// The _read function will also get a provisional size parameter as its first argument that specifies
// how many bytes the consumer wants to read, but your readable stream can ignore the size if it wants.
// Note that you can also use util.inherits() to subclass a Readable stream, but that approach doesn't lend itself very well to comprehensible examples.
// To show that our _read function is only being called when the consumer requests, we can modify our readable stream code slightly to add a delay:
const delayStream = new Readable;
let delayedCount = 97 - 1;

delayStream._read = function() {
  if (delayedCount >= 'z'.charCodeAt(0)){ return delayStream.push(null)}

  setTimeout(function() {
    delayStream.push(String.fromCharCode(++delayedCount))
  }, 100);
};
delayStream.pipe(process.stdout);

 */

// The setTimeout delay is necessary because the operating system requires some time to send us the relevant signals to close the pipe.
// The process.stdout.on('error', fn) handler is also necessary because the operating system will send a SIGPIPE to our
// process when head is no longer interested in our program's output, which gets emitted as an EPIPE error on process.stdout.
// These extra complications are necessary when interfacing with the external operating system pipes but are automatic when we interface directly with node streams the whole time.
// If you want to create a readable stream that pushes arbitrary values instead of just strings and buffers, make sure to create your readable stream with Readable({ objectMode: true }).

// Consuming a Readable Stream
const buildDex = async(entries) => { return nerds.resolve('Pokemon', entries).asArray(); };

cli.question('How many entries do you want in your pokedex?  ', async(amount) => {
  const pokedex = await buildDex(parseInt(amount, 10));

  const dexStream = new Readable;
  let count = 0;
  dexStream._read = function() {
    if (count >= pokedex.length){return dexStream.push(null)}
    setTimeout(function () {
      dexStream.push(`\n ${count + 1}/${amount}: ${JSON.stringify(pokedex[count], null, 2)}`);
      count++
    }, 1200);
  };
  dexStream.pipe(process.stdout);
});


process.on('exit', function() {
  console.error('\n done?');
});
process.stdout.on('error', process.exit);
