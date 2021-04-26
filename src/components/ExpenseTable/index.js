import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../../actions/walletActions';
import './style.css';

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      even: 'row even',
      odd: 'row odd',
    };

    this.expense = this.expense.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
  }

  expense() {
    const { expenses } = this.props;
    return expenses.map((expense) => {
      const rates = expense.exchangeRates[expense.currency];
      const { id, description, tag, method, value } = expense;
      const { even, odd } = this.state;
      const currency = rates.name.split('/')[0];
      const background = (id % 2 === 0) ? even : odd;
      const currentCurrency = parseFloat(rates.ask).toFixed(2);
      const convertedValue = (rates.ask * value).toFixed(2);
      return (
        <tr key={ id } className={ background }>
          <td className="description">{description}</td>
          <td className="tag">{tag}</td>
          <td className="method">{method}</td>
          <td className="value">{value}</td>
          <td className="currency">{currency}</td>
          <td className="current-currency">{currentCurrency}</td>
          <td className="converted-value">{convertedValue}</td>
          <td className="converted-currency">Real</td>
          <td className="edit-remove">
            <button
              type="button"
              className="edit"
            >
              Editar
            </button>
            <button
              type="button"
              className="remove"
              data-testid="delete-btn"
              onClick={ () => this.removeExpense(id, convertedValue) }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
  }

  removeExpense(id, convertedValue) {
    const { expenses, removeExpense } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    removeExpense(newExpenses, convertedValue);
  }

  render() {
    return (
      <table>
        <thead>
          <tr className="row">
            <th className="description">Descrição</th>
            <th className="tag">Tag</th>
            <th className="method">Método de pagamento</th>
            <th className="value">Valor</th>
            <th className="currency">Moeda</th>
            <th className="current-currency">Câmbio utilizado</th>
            <th className="converted-value">Valor convertido</th>
            <th className="converted-currency">Moeda de conversão</th>
            <th className="edit-remove">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.expense()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expenses, value) => dispatch(deleteExpense(expenses, value)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
