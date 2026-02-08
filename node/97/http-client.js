/* eslint-disable no-undef */
const http = require('http');

http.get(process.argv[2], (response) =>{
    response.setEncoding('utf8');

    response.on('error', (err) =>{
        console.error(err);
    });

    response.on('data', (chunk) =>{
        console.log(chunk);
    });

    // response.on('end', () =>{
    //     console.log('thats it');
    // });
});