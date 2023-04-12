const splitWord = (words, main) => {
  let data = [words];
  if (words.includes("を")) {
    data = words.split("を");
  } else if (words.includes("が")) {
    data = words.split("が");
  } else if (words.includes("に")) {
    data = words.split("に");
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].includes(main)) {
      return data[i];
    }
  }
};

module.exports = splitWord;
