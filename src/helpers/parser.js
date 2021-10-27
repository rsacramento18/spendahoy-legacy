
module.exports = {
  parseCsvMillenium: (data) => {
    const month = data[0][0].split('-');
    const monthExpense = {};
    monthExpense.mes = getMes(month[1]);
    monthExpense.mesNumber = month[1];
    monthExpense.custos = {};
    monthExpense.user = 'ricardo';
    data.forEach((item) => {
      const row = {
        data: item[0],
        descricao: item[2],
        valor: item[3],
        tipo: item[4],
      };

      if(item[4] === 'Crédito') {
        const ganho = Math.abs(item[3]);
        if (monthExpense.ganhos !== undefined) {
          monthExpense.ganhos.total += ganho;
        } else {
          monthExpense.ganhos = {};
          monthExpense.ganhos.total = ganho;
          monthExpense.ganhos.rows = [row];
        }
      } else {
        const categoria = findCategoria(item[2]);
        const despesa = Math.abs(item[3]);
        if (monthExpense.custos.total !== undefined) {
          monthExpense.custos.total += despesa;
        } else {
          monthExpense.custos.total = despesa;
        }
        if (monthExpense.custos[categoria] !== undefined) {
          monthExpense.custos[categoria].rows.push(row);
          monthExpense.custos[categoria].despesa += despesa;
        } else {
          monthExpense.custos[categoria] = {};
          monthExpense.custos[categoria].despesa = despesa;
          monthExpense.custos[categoria].rows = [row];
        }
      }
    });

    monthExpense.sobrou = monthExpense.ganhos.total - monthExpense.custos.total;

    return monthExpense;
  },

  parseCsvMontepio: (data) => {
    console.log(data);
    const month = data[0][0].split('-');
    const monthExpense = {};
    monthExpense.mes = getMes(month[1]);
    monthExpense.mesNumber = month[1];
    monthExpense.custos = {};
    monthExpense.user = 'carolina';
    data.forEach((item) => {
      const row = {
        data: item[0],
        descricao: item[2],
        valor: item[3],
        tipo: 'Débito',
      };
      if (item[3].charAt(0) === '-') {
        const categoria = findCategoria(item[2]);
        const despesa = convertStringToNumber(item[3]);

        if (monthExpense.custos.total !== undefined) {
          monthExpense.custos.total += despesa;
        } else {
          monthExpense.custos.total = despesa;
        }
        if (monthExpense.custos[categoria] !== undefined) {
          monthExpense.custos[categoria].rows.push(row);
          monthExpense.custos[categoria].despesa += despesa;
        } else {
          monthExpense.custos[categoria] = {};
          monthExpense.custos[categoria].despesa = despesa;
          monthExpense.custos[categoria].rows = [row];
        }
      } else {
        const ganho = convertStringToNumber(item[3]);

        if (monthExpense.ganhos !== undefined) {
          monthExpense.ganhos.total += ganho;
        } else {
          monthExpense.ganhos = {};
          monthExpense.ganhos.total = ganho;
          monthExpense.ganhos.rows = [row];
        }
      }
    });

    monthExpense.sobrou = monthExpense.ganhos.total - monthExpense.custos.total;

    return monthExpense;
  },
}

const getMes = (number) => {
  switch (number) {
    case "01":
      return "Janeiro";
    case "02":
      return "Fevereiro";
    case "03":
      return "Março";
    case "04":
      return "Abril";
    case "05":
      return "Maio";
    case "06":
      return "Junho";
    case "07":
      return "Julho";
    case "08":
      return "Agosto";
    case "09":
      return "Setembro";
    case "10":
      return "Outubro";
    case "11":
      return "Novembro";
    case "12":
      return "Dezembro";
  }
};

const convertStringToNumber = (str) => {
  const strWithoutDots = str.replace('.','');
  const strWithDots = strWithoutDots.replace(',','.');
  const strConverted = Math.abs(strWithDots);
  return strConverted;
}

const findCategoria = (descricao) => {
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
