/*
 *  Streams
 *  Streams are, simply speaking, collections of data.
 *  The difference between them and say, strings or arrays, is that when reading a stream you don't necessarily get all the data at once.
 *  Further, the (complete) data doesn't have to fit into memory. This is what makes streams so powerful. You can work with large amounts of data
 *  or data coming from an external source one chunk at a time.
 *
 *  Large data isn't the only benefit gained when working with streams though. They also give us some powerful options when it comes to composability.
 *  Just like when working in Bash, we can pipe streams into other streams or into other tools.
 *
 *  Many of the built-in Node Modules implement the streaming interface, including:
 *  Readable Streams ->                |  Writable Streams ->
 *  HTTP response, on the client       |  HTTP requests, on the client
 *  HTTP request, on the server        |  HTTP responses, on the server
 *  fs read streams                    |  fs write streams
 *  zlib streams                       |  zlib streams
 *  crypto streams                     |  crypto streams
 *  TCP sockets                        |  TCP sockets
 *  child process stdout * stderr      |  child process stdin
 *  process.stdin                      |  process.stdout, process.stderr
 *
 *  Some of these (like zlib & crypto) are both readable & writeable streams. Notice that the objects are also closely related.
 *  While an HTTP response is a readable stream on the client, it’s a writable stream on the server.
 *  This is because in the HTTP case, we basically read from one object (http.IncomingMessage) and write to the other (http.ServerResponse).
 *  Also note how the stdio streams (stdin, stdout, stderr) have the inverse stream types when it comes to child processes.
 *  This allows for a really easy way to pipe to, and from, these child process stdio streams using the main process stdio streams.
 *  There are 5 kinds of streams:
 *  readable, writable, duplex, transform, and "classic"
 *
 *  Pipe
 *  All the different types of streams use `.pipe()` to pair inputs with outputs.
 *  'pipe()' is just a function that takes a readable stream `src` and hooks the output to a destination writable stream 'dst'
 *  Example:
 *  src.pipe(dst)
 *  .pipe(dst) returns `dst`, so you can chain multiple `.pipe()` together
 *  Example:
 *  a.pipe(b).pipe(c).pipe(d);
 */

// Theory is great but not 100% convincing. Let's make an example to show how streams handling of memory consumption is so useful.
// Lets make a big file!!!! [ WARNING THIS IS GOING TO FREEZE YOUR COMP FOR LIKE 20 SECONDS, JUST CHILL AND WAIT ]

const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 1e6; i++){
  file.write(`Drake Equation vastness is bearable only through love the only home we've ever known take root and flourish not a sunrise but a galaxyrise preserve and cherish that pale blue dot. Apollonius of Perga finite but unbounded Sea of Tranquility inconspicuous motes of rock and gas hearts of the stars gathered by gravity. The sky calls to us invent the universe paroxysm of global death courage of our questions from which we spring are creatures of the cosmos.
Hearts of the stars Hypatia a still more glorious dawn awaits tendrils of gossamer clouds rings of Uranus as a patch of light. Take root and flourish courage of our questions citizens of distant epochs worldlets radio telescope take root and flourish. Made in the interiors of collapsing stars vastness is bearable only through love encyclopaedia galactica rich in heavy atoms vastness is bearable only through love made in the interiors of collapsing stars?
How far away two ghostly white figures in coveralls and helmets are soflty dancing bits of moving fluff a billion trillion tesseract rich in mystery. Something incredible is waiting to be known rich in heavy atoms gathered by gravity vastness is bearable only through love something incredible is waiting to be known extraordinary claims require extraordinary evidence. Vanquish the impossible are creatures of the cosmos star stuff harvesting star light a very small stage in a vast cosmic arena inconspicuous motes of rock and gas star stuff harvesting star light?
Euclid galaxies dream of the mind's eye Cambrian explosion as a patch of light from which we spring. Something incredible is waiting to be known concept of the number one great turbulent clouds Sea of Tranquility emerged into consciousness stirred by starlight. Citizens of distant epochs paroxysm of global death paroxysm of global death the sky calls to us paroxysm of global death hundreds of thousands? Invent the universe network of wormholes rich in heavy atoms the ash of stellar alchemy rich in heavy atoms permanence of the stars?
Kindling the energy hidden in matter vanquish the impossible worldlets a billion trillion tingling of the spine descended from astronomers. Are creatures of the cosmos a very small stage in a vast cosmic arena a very small stage in a vast cosmic arena a still more glorious dawn awaits muse about take root and flourish. Two ghostly white figures in coveralls and helmets are soflty dancing star stuff harvesting star light citizens of distant epochs gathered by gravity at the edge of forever Orion's sword?
Citizens of distant epochs encyclopaedia galactica billions upon billions Cambrian explosion Tunguska event astonishment. Kindling the energy hidden in matter network of wormholes Vangelis at the edge of forever stirred by starlight emerged into consciousness. Vanquish the impossible the carbon in our apple pies dream of the mind's eye courage of our questions ship of the imagination courage of our questions? The carbon in our apple pies courage of our questions hundreds of thousands the sky calls to us the sky calls to us invent the universe and billions upon billions upon billions upon billions upon billions upon billions upon billions.`)
}
file.end();
