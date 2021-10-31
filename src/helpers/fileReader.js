const fs = require("fs");
const csv = require("fast-csv");
const parser = require("../helpers/parser");

module.exports = {
  readFileMillenium: (req, res, account) => {
    const csvData = [];
    const filePath = `${basedir}/uploads/${req.file.filename}`;
    let stream = fs.createReadStream(filePath, { encoding: 'utf-16le'})
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
        console.log(row[0]);
        if (row[4] === "Débito") { 
          const obj = {
            date: new Date(getDateFromString(row[0])),
            description: row[2],
            value: Math.abs(row[3]),
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

  readFileMontepioDebito: (req, res) => {
    const csvData = [];
    const filePath = `${basedir}/uploads/${req.file.filename}`;
    fs.createReadStream(filePath, { encoding:'latin1' })
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
        console.log(row[0]);
        if (row[0].startsWith('2021') && row[3].startsWith('-')) {
          const obj = {
            date: new Date(row[0]),
            description: row[2],
            value: convertStringToNumber(row[3]),
            user: 'carolina'
          }
          csvData.push(obj);
        }
      })
      .on("end", () => {
        // console.log(csvData);
        const parsedData = parser.parse(csvData);
        res.send(parsedData);
      });
  },

  readFileMontepioCrédito: (req, res) => {
    console.log("credito");
    const csvData = [];
    const filePath = `${basedir}/uploads/${req.file.filename}`;

    let readStream = fs.createReadStream(filePath)
    readStream.setEncoding('latin1');
    readStream.on('data', (row) => console.log(row));
      // .pipe(
      //   csv.parse({
      //     header: true,
      //     delimiter: "\t",
      //   })
      // )
      // .on("error", (error) => {
      //   throw error.message;
      // })
      // .on("data", (row) => {
      //   console.log(row);
      //   if (row[0].startsWith('2021') && row[3].startsWith('-')) {
      //     const obj = {
      //       date: Date(row[0]),
      //       description: row[2],
      //       value: account === 'Montepio' ? convertStringToNumber(row[3]) : Math.abs(row[3]),
      //       user: 'carolina'
      //     }
      //     csvData.push(obj);
      //   }
      // })
      // .on("end", () => {
      //   // console.log(csvData);
      //   const parsedData = parser.parse(csvData);
      //   res.send(parsedData);
      // });
    res.send('send');
  },
};

const getDateFromString = (date) => {
  date.split('-');
  return date[2] + '-' + date[1] + '-' + date[0];
};

const convertStringToNumber = (str) => {
  const strWithoutDots = str.replace('.','');
  const strWithDots = strWithoutDots.replace(',','.');
  const strConverted = Math.abs(strWithDots);
  return strConverted;
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

