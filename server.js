const express = require("express");
const reader = require("xlsx");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const buildXlsx = require("./build/buildXlsx.js");
const splitWord = require("./build/splitWord.js");
const buildMean = require("./build/buildMean.js");

const app = express();
const port = 3019;
const nameFile = "./kanji_c1.xlsx";
const file = reader.readFile(nameFile);

let example = `SELECT id,content,mean
           FROM example
           WHERE content like ?`;

function createDbConnection(filename) {
  return open({
    filename,
    driver: sqlite3.Database,
  });
}

async function main() {
  try {
    sqlite3.verbose();
    const db = await createDbConnection("./javn3.db");
    const sheets = file.SheetNames;
    let data = [];
    let result = [];
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }
    data = buildXlsx(data);
    for (var i = 0; i < data.length; i++) {
      let mean = await getMean(db, data[i].word);
      if (mean.length > 0) {
        result.push({
          ...mean[0],
          mean: buildMean(mean[0].mean),
          main: data[i].Kanji,
        });
      } else {
        const word = splitWord(data[i].word);
        mean = await getMean(db, word);
        if (mean.length > 0) {
          result.push({
            ...mean[0],
            mean: buildMean(mean[0].mean),
            main: data[i].Kanji,
          });
        }
      }
      console.log(`${i}writing....`);
    }
    const ws = reader.utils.json_to_sheet(result);

    reader.utils.book_append_sheet(file, ws, "Sheet2");
    reader.writeFile(file, nameFile);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function getMean(db, word) {
  try {
    const query = `SELECT word,phonetic,mean,han
           FROM javi
           WHERE word = ?`;
    const row = await db.all(query, [word]);
    return row;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

main();

app.listen(port, () => {
  console.log("------------------------------------------");
  console.log("server started");
  console.log("------------------------------------------");
});
