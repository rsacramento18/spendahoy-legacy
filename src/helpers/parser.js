const { Connection } = require("../config/database.config");

module.exports = {
  parse: (data) => {
    let parsedData = initParsedData();
    
    data.sort((x1,x2) => {
      return x1.date - x2.date
    })
    .forEach((item) => {
      const category = findCategory(item.description); 
      parsedData.total += item.value;
      parsedData[category].total += item.value;
      parsedData[category].rows.push(item);

    });

    return parsedData;
  },

}

const convertStringToNumber = (str) => {
  const strWithoutDots = str.replace('.','');
  const strWithDots = strWithoutDots.replace(',','.');
  const strConverted = Math.abs(strWithDots);
  return strConverted;
}


const initParsedData = () => {
  return {
    total: 0,
    balu: {
      total: 0,
      rows: [],
    },
    casa: {
      total: 0,
      rows: [],
    },
    carro: {
      total: 0,
      rows: [],
    },
    desporto: {
      total: 0,
      rows: [],
    },
    levantamentos: {
      total: 0,
      rows: [],
    },
    multimedia: {
      total: 0,
      rows: [],
    },
    pagamentoCredito: {
      total: 0,
      rows: [],
    },
    restaurantes: {
      total: 0,
      rows: [],
    },
    saude: {
      total: 0,
      rows: [],
    },
    supermercado: {
      total: 0,
      rows: [],
    },
    outros: {
      total: 0,
      rows: [],
    },

  }
}

const findCategory = (descricao) => {
  if (descricao.includes("RIOTGAMESLI")) return "multimedia";
  if (descricao.includes("SPOTIFY")) return "multimedia";
  if (descricao.includes("STEAM")) return "multimedia";

  if (descricao.includes("CONDOMINIO")) return "casa";
  if (descricao.includes("Lusiadaenergia")) return "casa";
  if (descricao.includes("PROCESSAMENTO EMP")) return "casa";
  if (descricao.includes("MEO")) return "casa";
  if (descricao.includes("EMPRESTIMO HIPOT")) return "casa";
  if (descricao.includes("AGUAS DO SADO")) return "casa";

  if (descricao.includes("AUCHAN")) return "supermercado";
  if (descricao.includes("CONTINENTE")) return "supermercado";

  if (descricao.includes("GALP")) return "carro";
  if (descricao.includes("REPSOL")) return "carro";
  if (descricao.includes("VIAVERDE")) return "carro";

  if (descricao.includes("CASA DO POLVO")) return "restaurantes";
  if (descricao.includes("BURGUER RANCH")) return "restaurantes";
  if (descricao.includes("PMNTSBVEATS")) return "restaurantes";
  if (descricao.includes("CASA DOS CARACOIS")) return "restaurantes";

  if (descricao.includes("LEV ATM")) return "levantamentos";

  if (descricao.includes("SPORT ZONE")) return "desporto";

  if (descricao.includes("FARMACIA")) return "saude";
  if (descricao.includes("M SILVA")) return "saude";

  if (descricao.includes("TRF MB WAY P/ *****4562")) return "poupanca";

  if (descricao.includes("FISH PLANET")) return "balu";

  if (descricao.includes("VIS PAGAMENTO CARTAO CREDITO"))
    return "pagamentoCredito";

  return "outros";
};
