const fs = require("fs");
const csv = require("fast-csv");
const { Connection } = require("../config/database.config.js");
const readFiles = require("../helpers/fileReader.js");

module.exports = {
  importMillenium: (req, res) => {
    if (req.file == undefined) {
      return res.status(400).send({
        message: "Please upload a csv to read",
      });
    }
    readFiles.readFileMillenium(req, res, "Millenium");
  },

  importMontepioDebito: (req, res) => {
    if (req.file == undefined) {
      return res.status(400).send({
        message: "Please upload a csv to read",
      });
    }
    readFiles.readFileMontepioDebito(req, res, "Montepio");
  },

  // findAll: (req, res) => {},

  // findOne: (req, res) => {},
};
