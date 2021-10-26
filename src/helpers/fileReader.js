const fs = require('fs');
const csv = require('fast-csv');
const { Connection } = require('../config/database.config.js');

module.exports = {
  readFileMillenium: (req, res, account) => {
    const encoding = getEncoding(account);
    const skipHeaders = account === 'Montepio';
    const csvData = [];
    const filePath = `${__basedir}/uploads/${req.file.filename}`;
    fs.createReadStream(filePath, { encoding })
      .pipe(
        csv.parse({
          header: skipHeaders,
          delimiter: ';',
        }),
      )
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (row) => {
        if (row[4] === 'Débito' || row[4] === 'Crédito') csvData.push(row);
      })
      .on('end', () => {
        const user = parseCsvMillenium(csvData);
        res.send(user);
      });
  },

  readFileMontepioDebito: (req, res, account) => {
    const encoding = getEncoding(account);
    const skipHeaders = account === 'Montepio';
    const csvData = [];
    const filePath = `${__basedir}/uploads/${req.file.filename}`;
    fs.createReadStream(filePath, { encoding })
      .pipe(
        csv.parse({
          header: skipHeaders,
          delimiter: ';',
        }),
      )
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (row) => {
        if (row[4] === 'Débito' || row[4] === 'Crédito') csvData.push(row);
      })
      .on('end', () => {
        const user = parseCsvMillenium(csvData);
        res.send(user);
      });
  },
};