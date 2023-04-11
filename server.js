const express = require("express");
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./javn3.db");
const app = express();
const port = 3019;

let sql = `SELECT id,word,mean
           FROM javi
           WHERE word = ?`;

const getMean = (word) => {
  let a = [];
  db.all(sql, [word], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
    a = rows;
  });
  return a;
};

console.log(getMean("勉強する"));

app.listen(port, () => {
  console.log("------------------------------------------");
  console.log("server started");
  console.log("------------------------------------------");
});
