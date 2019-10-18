const cli = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const nerds = require('nerds');

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
  process.exit();
});


