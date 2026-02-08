/* eslint-disable no-undef */
const http = require("http");

const responses = [];
let completedGets = 0;

for (let i = 2; i < process.argv.length; i++) {
  http.get(process.argv[i], (response) => {
    response.setEncoding("utf8");
    responses[i] = '';

    response.on("error", (err) => {
      console.error(err);
    });

    response.on("data", (chunk) => {
        
      responses[i] +=  chunk;
    });

    response.on("end", () => {
        completedGets++;
        if(completedGets === process.argv.length - 2){
            responses.forEach((res) => console.log(res));
        }
    });
  });
}
