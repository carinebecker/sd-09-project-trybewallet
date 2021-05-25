import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class WalletTable extends React.Component {
  removeExpenseHandler(id) {
    const { removeExpense } = this.props;
    removeExpense(id);
  }

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {Number(expense.value * expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <th>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.removeExpenseHandler(expense.id) }
                >
                  Excluir
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

WalletTable.propTypes = {
  removeExpense: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    enxangeRates: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      codein: PropTypes.string,
      name: PropTypes.string,
      high: PropTypes.number,
      low: PropTypes.number,
      varBid: PropTypes.number,
      pctChange: PropTypes.number,
      bid: PropTypes.number,
      ask: PropTypes.number,
      timestamp: PropTypes.number,
      create_date: PropTypes.string,
    })),
  })),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
});

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
