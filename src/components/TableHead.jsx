import React from 'react';

class TableHead extends React.Component {
  render() {
    const fields = {
      description: 'Descrição',
      tag: 'Tag',
      method: 'Método de pagamento',
      value: 'Valor',
      currency: 'Moeda',
      exchangeUsed: 'Câmbio utilizado',
      convertedValue: 'Valor convertido',
      exchangeCurrency: 'Moeda de conversão',
      editDelete: 'Editar/Excluir',
    };
    return (
      <thead className="wallet-table-head">
        <tr className="wallet-table-head-row">
          {Object.values(fields).map((fieldName) => (
            <th key={ fieldName }>{ fieldName }</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
