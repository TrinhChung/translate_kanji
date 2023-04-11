"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class javi extends Model {
    static associate(models) {}
  }
  javi.init(
    {
      word: DataTypes.STRING,
      phonetic: DataTypes.STRING,
      mean: DataTypes.STRING,
      seq: DataTypes.STRING,
      favorite: DataTypes.STRING,
      opposite_word: DataTypes.STRING,
      synsets: DataTypes.STRING,
      related_words: DataTypes.STRING,
      han: DataTypes.STRING,
      short_mean: DataTypes.STRING,
      level: DataTypes.STRING,
      remember: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "javi",
    }
  );
  return javi;
};
