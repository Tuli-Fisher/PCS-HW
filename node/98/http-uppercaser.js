const http = require("http");
const map = require("through2-map");
const {Transform} = require('stream');

http
  .createServer((req, res) => {
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "text/plain");
      res.end("Only POST requests are allowed\n");
      return;
    }
    //req.pipe(map((chunk) => chunk.toString().toUpperCase())).pipe(res);
    const uppercaser = new Transform({transform 
        (chunk, encoding, callback) {
            callback(null, chunk.toString().toUpperCase());
        }
    });
    req.pipe(uppercaser).pipe(res);
  })
  .listen(process.argv[2]);
