//import fs from 'node:fs';

'use strict';
const fs = require('fs');

let fileContents = '';

fs.readFile(process.argv[2], (err, data) =>{
    if(err){
        console.error('whoops', err);
        return;
    }
    fileContents = data.toString();
    console.log(fileContents.split('\n').length - 1);
});


