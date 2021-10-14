const fs = require('fs');
const csv = require('fast-csv');
const { Connection } = require('../config/database.config.js');

exports.importMillenium = (req, res) => {
  if(req.file == undefined ) {
    return res.status(400).send({
      message: "Please upload a csv to read"
    });

  }
  readFile(req, res, 'Millenium');
};

exports.importMontepio = (req, res) => {

  if(req.file == undefined ) {
    return res.status(400).send({
      message: "Please upload a csv to read"
    });
  }
  readFile(req, res, 'Montepio');
};

exports.findAll = (req, res) => {

};

exports.findOne = (req, res) => {

};

const readFile = (req, res, account) => {
  
  let encoding = getEncoding(account);
  let skipHeaders = account === 'Montepio';
  let csvData = [];
  let filePath = __basedir + '/uploads/' + req.file.filename;
  fs.createReadStream(filePath, {encoding: encoding})
    .pipe(csv.parse({
      header:skipHeaders, 
      delimiter: ';'
    }))
    .on("error", (error) => {
      throw error.message;
    })
    .on("data", (row) => {
      console.log(row);
      if(row[4] === 'Débito' || row[4] === 'Crédito' || row[0].startsWith('2021')){
        csvData.push(row);
      }
    })
    .on("end", () => {
      if(account === 'Millenium'){
        let user = parseCsvMillenium(csvData);
      }
      else {
        let user = parseCsvMontepio(csvData);
      }
      res.send(user);
    });
}

const getEncoding = (account) => {
  switch (account) {
    case 'Montepio':
      return 'latin1';
    case 'Millenium':
      return 'utf-16le';
    default:
      return 'utf-8';
  }
}


const parseCsvMillenium = (data) => {
  let month = data[0][0].split('-');
  let monthExpense = {};
  monthExpense.mes = getMes(month[1]);
  monthExpense.mesNumber = month[1];
  monthExpense.custos = {};
  monthExpense.user = 'ricardo';
  data.forEach(item => {
      let row = {
          data: item[0],
          descricao: item[2],
          valor: item[3],
          tipo: item[4],
      }
      if(item[3].charAt(0) !== '-'){
          let ganho = Math.abs(item[3]);
          if(monthExpense.ganhos !== undefined) {
              monthExpense.ganhos.total += ganho;
          }
          else {
              monthExpense.ganhos = {};
              monthExpense.ganhos.total = ganho;
              monthExpense.ganhos.rows = [row];
          }
      }
      else {
          let categoria = findCategoria(item[2]);
          let despesa = Math.abs(item[3]);
          if(monthExpense.custos.total !== undefined) {
              monthExpense.custos.total += despesa;
          }
          else {
              monthExpense.custos.total = despesa;
          }
          if(monthExpense.custos[categoria] !== undefined){
              monthExpense.custos[categoria].rows.push(row);
              monthExpense.custos[categoria].despesa += despesa;
          }
          else { 
              monthExpense.custos[categoria] = {};
              monthExpense.custos[categoria].despesa = despesa;
              monthExpense.custos[categoria].rows = [row];
          }
      }

  });

  monthExpense.sobrou = monthExpense.ganhos.total - monthExpense.custos.total;

  return monthExpense;
}

const parseCsvMontepio = (data) => {
  let month = data[0][0].split('-');
  let monthExpense = {};
  monthExpense.mes = getMes(month[1]);
  monthExpense.mesNumber = month[1];
  monthExpense.custos = {};
  monthExpense.user = 'carolina';
  data.forEach(item => {
      let row = {
          data: item[0],
          descricao: item[2],
          valor: item[3],
          tipo: 'Débito',
      }
      if(item[3].charAt(0) !== '-'){
          let ganho = Math.abs(item[3]);
          if(monthExpense.ganhos !== undefined) {
              monthExpense.ganhos.total += ganho;
          }
          else {
              monthExpense.ganhos = {};
              monthExpense.ganhos.total = ganho;
              monthExpense.ganhos.rows = [row];
          }
      }
      else {
          let categoria = findCategoria(item[2]);
          let despesa = Math.abs(item[3]);
          if(monthExpense.custos.total !== undefined) {
              monthExpense.custos.total += despesa;
          }
          else {
              monthExpense.custos.total = despesa;
          }
          if(monthExpense.custos[categoria] !== undefined){
              monthExpense.custos[categoria].rows.push(row);
              monthExpense.custos[categoria].despesa += despesa;
          }
          else { 
              monthExpense.custos[categoria] = {};
              monthExpense.custos[categoria].despesa = despesa;
              monthExpense.custos[categoria].rows = [row];
          }
      }

  });

  monthExpense.sobrou = monthExpense.ganhos.total - monthExpense.custos.total;

  return monthExpense;
}

const getMes = (number) => {
    switch(number) {
        case '01':
            return 'Janeiro';
        case '02':
            return 'Fevereiro';
        case '03':
            return 'Março';
        case '04':
            return 'Abril';
        case '05':
            return 'Maio';
        case '06':
            return 'Junho';
        case '07':
            return 'Julho';
        case '08':
            return 'Agosto';
        case '09':
            return 'Setembro';
        case '10':
            return 'Outubro';
        case '11':
            return 'Novembro';
        case '12':
            return 'Dezembro';
    }
}

const findCategoria = (descricao) => {
    if(descricao.includes('RIOTGAMESLI')) return 'multimedia';
    if(descricao.includes('SPOTIFY')) return 'multimedia';
    if(descricao.includes('STEAM')) return 'multimedia';

    if(descricao.includes('CONDOMINIO')) return 'casa';
    if(descricao.includes('Lusiadaenergia')) return 'casa';
    if(descricao.includes('PROCESSAMENTO EMP')) return 'casa';
    if(descricao.includes('MEO')) return 'casa';
    if(descricao.includes('EMPRESTIMO HIPOT')) return 'casa';
    if(descricao.includes('AGUAS DO SADO')) return 'casa';

    if(descricao.includes('AUCHAN')) return 'supermercado';
    if(descricao.includes('CONTINENTE')) return 'supermercado';

    if(descricao.includes('GALP')) return 'carro';
    if(descricao.includes('REPSOL')) return 'carro';
    if(descricao.includes('VIAVERDE')) return 'carro';

    if(descricao.includes('CASA DO POLVO')) return 'restaurantes';
    if(descricao.includes('BURGUER RANCH')) return 'restaurantes';
    if(descricao.includes('PMNTSBVEATS')) return 'restaurantes';
    if(descricao.includes('CASA DOS CARACOIS')) return 'restaurantes';

    if(descricao.includes('LEV ATM')) return 'levantamentos';

    if(descricao.includes('SPORT ZONE')) return 'desporto';

    if(descricao.includes('FARMACIA')) return 'saude';
    if(descricao.includes('M SILVA')) return 'saude';

    if(descricao.includes('TRF MB WAY P/ *****4562')) return 'poupanca';

    if(descricao.includes('FISH PLANET')) return 'balu';

    if(descricao.includes('VIS PAGAMENTO CARTAO CREDITO')) return 'pagamentoCredito';

    return 'outros';
}
