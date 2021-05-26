import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletTable extends React.Component {
  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    const { expenses, deleteRow, changeExpense } = this.props;
    // if (!expenses.length) return <div>Loading</div>;
    return (
      <table>
        <thead>
          <tr>
            {tableHeaders.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          { expenses.map(({
            description, value, method, currency, id, exchangeRates, tag,
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{parseFloat(exchangeRates[currency].ask * value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteRow(id, exchangeRates[currency]) }
                >
                  Excluir
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => changeExpense(id) }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>);
  }
}

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteRow: PropTypes.func.isRequired,
  changeExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps, null)(WalletTable);
