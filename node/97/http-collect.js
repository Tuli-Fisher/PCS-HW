/* eslint-disable no-undef */
const http = require('http');

let completeString = '';

http.get(process.argv[2], (response) =>{
    response.setEncoding('utf8');

    response.on('error', (err) =>{
        console.error(err);
    });

    response.on('data', (chunk) =>{
        completeString += chunk;
    });

    response.on('end', () =>{
        console.log(completeString.length);
        console.log(completeString);
    });
});