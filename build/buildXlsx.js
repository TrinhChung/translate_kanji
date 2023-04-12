const buildXlsx = (data) => {
  let main = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i] && data[i].Kanji) {
      main = data[i].Kanji;
    }
    if (data[i] && !data[i].Kanji) {
      data[i].Kanji = main;
    }
  }
  return data;
};
module.exports = buildXlsx;
