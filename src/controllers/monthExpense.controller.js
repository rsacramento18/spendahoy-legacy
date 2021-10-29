const readFiles = require("../helpers/fileReader");
const parser = require("../helpers/parser");

module.exports = {

  importData: (req, res) => {
    let csvData = '';
    let object = '';

    if(req.file == undefined) {
      return res.status(400).send({
        message: "Please upload a csv to read",
      });
    }
    if(req.file.filename.endsWith('csv'))
      readFiles.readFileMillenium(req, res);
    else 
      readFiles.readFileMontepio(req, res);

  },

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
        message: "Please upload a xls to read",
      });
    }
    readFiles.readFileMontepioDebito(req, res, "Montepio");
  },

  // findAll: (req, res) => {},

  // findOne: (req, res) => {},
};
