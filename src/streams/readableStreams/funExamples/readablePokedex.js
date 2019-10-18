// Readable Streams
// Readable Streams produce data that can be fed into a writeable, transform, or duplex stream by calling .pipe() -> readableStream.pipe(dst)
const Readable = require('stream').Readable;
const nerds = require('nerds');

const pokedex = nerds.resolve('Pokemon', 10).asArray();
const dexStream = new Readable;

let count = 0;
dexStream._read = function() {
  if (count >= pokedex.length){return dexStream.push(null)}
  setTimeout(function () {
    dexStream.push(`\n ${count + 1}/10: ${JSON.stringify(pokedex[count], null, 2)}`);
    count++
  }, 200);
};
dexStream.pipe(process.stdout);


