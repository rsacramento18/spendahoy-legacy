const fs = require('fs');
const csv = require('fast-csv');
const { Connection } = require('../config/database.config.js');
const readFiles = require('../helpers/fileReader.js');

module.exports = {
  importMillenium = (req, res) => {
    if(req.file == undefined ) {
      return res.status(400).send({
        message: "Please upload a csv to read"
      });

    }
    readFiles.readFileMillenium(req, res, 'Millenium');
  },

  importMontepioDebito = (req, res) => {

    if(req.file == undefined ) {
      return res.status(400).send({
        message: "Please upload a csv to read"
      });
    }
    readFiles.readFileMontepioDebito(req, res, 'Montepio');
  },

  exports.findAll = (req, res) => {

  },

  exports.findOne = (req, res) => {

  },
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
