const parseCsvMillenium = (data) => {
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
    if (item[3].charAt(0) !== '-') {
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
};

const parseCsvMontepio = (data) => {
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
    if (item[3].charAt(0) !== '-') {
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

};
