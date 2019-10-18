// You can also use .unshift() to put back data so that the same read logic will fire when .read() gives you more data than you wanted.
// Using .unshift() prevents us from making unnecessary buffer copies. Here we can build a readable parser to split on newlines:

let offset = 0;
process.stdin.on('readable', function () {
  let buffer = process.stdin.read();
  if (!buffer){ return; }
  for (; offset < buffer.length; offset++) {
    if (buffer[offset] === 0x0a) {
      console.dir(buffer.slice(0, offset).toString());
      buffer = buffer.slice(offset + 1);
      offset = 0;
      process.stdin.unshift(buffer);
      return;
    }
  }
  process.stdin.unshift(buffer);
});

// However, there are modules on npm such as 'split' that you could use instead of rolling your own line-parsing logic.
