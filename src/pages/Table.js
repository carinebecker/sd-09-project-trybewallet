import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th>  Moeda de conversão </th>
            <th> Editar / Excluir </th>
          </tr>
        </thead>
        <tbody className="expense-table-body">
          { expenses.map((expense) => (
            <tr key={ `expense-${expense.id}` }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ expense.value }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                { parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2) }

                {/* .ask? */}
              </td>
              <td>
                { (expense.value * expense.exchangeRates[expense.currency].ask)
                  .toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button type="button" className="edit-expense-btn">Editar</button>
                <button type="button" className="delete-expense-btn">Excluir</button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      // A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave expenses que vem do reducer wallet.
      // O campo de Moeda e Moeda de Conversão deverão conter o nome da moeda. Portanto, ao invés de 'USD' ou 'EUR', deve conter "Dólar Comercial" e "Euro", respectivamente
      // Por padrão, o campo 'Moeda de conversão' exibirá 'Real'
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
// Pq usar propTYpes.obj dentro do arrayOf ??

// Consultei repositório : https://github.com/tryber/sd-09-project-trybewallet/pull/80/commits/18324ce5e6c18f1c0e0f659670fc49bbb6723769
export default connect(mapStateToProps)(Table);
