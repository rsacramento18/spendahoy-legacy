const fs = require("fs");
const csv = require("fast-csv");
const { Connection } = require("../config/database.config.js");
const parser = require("../helpers/parser");

module.exports = {
  readFileMillenium: (req, res, account) => {
    const encoding = getEncoding(account);
    const skipHeaders = account === "Montepio";
    const csvData = [];
    const filePath = `${basedir}/uploads/${req.file.filename}`;
    fs.createReadStream(filePath, { encoding })
      .pipe(
        csv.parse({
          header: skipHeaders,
          delimiter: ";",
        })
      )
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        if (row[4] === "Débito" || row[4] === "Crédito") csvData.push(row);
      })
      .on("end", () => {
        const user = parser.parseCsvMillenium(csvData);
        res.send(user);
      });
  },

  readFileMontepioDebito: (req, res, account) => {
    const encoding = getEncoding(account);
    const skipHeaders = account === "Montepio";
    const csvData = [];
    const filePath = `${basedir}/uploads/${req.file.filename}`;
    fs.createReadStream(filePath, { encoding })
      .pipe(
        csv.parse({
          header: skipHeaders,
          delimiter: "\t",
        })
      )
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        if (row[0].startsWith('2021')) csvData.push(row);
      })
      .on("end", () => {
        const user = parser.parseCsvMontepio(csvData);
        res.send(user);
      });
  },
};

const getEncoding = (account) => {
  switch (account) {
    case "Montepio":
      return "latin1";
    case "Millenium":
      return "utf-16le";
    default:
      return "utf-8";
  }
};

