const fs = require("fs");
const csv = require("fast-csv");
const parser = require("../helpers/parser");

module.exports = {
  readFileMillenium: (req, res, account) => {
    const encoding = getEncoding('Millenium');
    const csvData = [];
    const filePath = `${basedir}/uploads/${req.file.filename}`;
    fs.createReadStream(filePath, { encoding })
      .pipe(
        csv.parse({
          header: false,
          delimiter: ";",
        })
      )
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        if (row[4] === "Débito") { 
          const obj = {
            date: Date(row[0]),
            description: row[2],
            value: convertStringToNumber(row[3]),
            user: 'ricardo'
          }
          csvData.push(obj);
        }
      })
      .on("end", () => {
        const parsedData = parser.parse(csvData);
        res.send(parsedData);
      });
  },

  readFileMontepioDebito: (req, res, account) => {
    const encoding = getEncoding('Montepio');
    const csvData = [];
    const filePath = `${basedir}/uploads/${req.file.filename}`;
    fs.createReadStream(filePath, { encoding })
      .pipe(
        csv.parse({
          header: true,
          delimiter: "\t",
        })
      )
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        if (row[0].startsWith('2021') && row[3].startsWith('-')) {
          const obj = {
            date: Date(row[0]),
            description: row[2],
            value: convertStringToNumber(row[3]),
            user: 'carolina'
          }
          csvData.push(obj);
        }
      })
      .on("end", () => {
        const parsedData = parser.parse(csvData);
        res.send(parsedData);
      });
  },
};

const convertStringToNumber = (str) => {
  const strWithoutDots = str.replace('.','');
  const strWithDots = strWithoutDots.replace(',','.');
  const strConverted = Math.abs(strWithDots);
  return strConverted;
}

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

