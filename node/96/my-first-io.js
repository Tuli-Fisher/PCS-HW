const fs = require('fs');

const filseString = fs.readFileSync(process.argv[2], 'utf8');
const splitLines = filseString.split('\n');

console.log(splitLines.length - 1);