/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");

fs.readdir(process.argv[2], (err, list) => {
  if (err) {
    console.error(err);
    return;
  }
  const filter = `.${process.argv[3]}`;
  list
    .filter((file) => path.extname(file) === filter)
    .forEach((file) => console.log(file));
});
