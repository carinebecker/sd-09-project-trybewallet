import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense as removeGlobalExpense } from '../actions';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableContent: [],
      isNewContent: false,
    };

    this.generateTableContent = this.generateTableContent.bind(this);
    this.setNewContent = this.setNewContent.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    const { expenses } = this.props;
    if (expenses.length) {
      this.generateTableContent();
    }
  }

  componentDidUpdate(prevProps) {
    const { isFetching, expenses } = this.props;
    const { isNewContent } = this.state;
    if (isFetching && !isNewContent) {
      this.setNewContent();
    }
    if ((!isFetching && isNewContent) || prevProps.expenses !== expenses) {
      this.generateTableContent();
    }
  }

  setNewContent() {
    this.setState({ isNewContent: true });
  }

  removeItem(index) {
    const { expenses, removeExpense } = this.props;
    removeExpense(expenses[index]);
  }

  generateTableContent() {
    const { expenses } = this.props;
    const tableContent = expenses.map((expense, index) => {
      const { description, tag, method, value, exchangeRates, currency } = expense;
      const formattedValue = `${Number(value)}`;
      const currencyName = exchangeRates[currency].name.split('/')[0];
      let exchange = exchangeRates[currency].ask;
      const exchangedValue = Math.round((value * exchange) * 100) / 100;
      exchange = Math.round(exchangeRates[currency].ask * 100) / 100;
      const exchangedCurrency = 'Real';
      const buttons = (
        <div>
          <button type="button"> Editar </button>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => this.removeItem(index) }
          >
            Deletar
          </button>
        </div>
      );
      return {
        description,
        tag,
        method,
        formattedValue,
        currencyName,
        exchange,
        exchangedValue,
        exchangedCurrency,
        buttons,
      };
    });
    this.setState({ tableContent, isNewContent: false });
  }

  render() {
    const { tableContent } = this.state;
    const tableBody = tableContent
      .map(({ description, tag, method, formattedValue, currencyName, exchange,
        exchangedValue, exchangedCurrency, buttons }, index) => (
        (
          <tr key={ index }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ formattedValue }</td>
            <td>{ currencyName }</td>
            <td>{ exchange }</td>
            <td>{ exchangedValue }</td>
            <td>{ exchangedCurrency }</td>
            <td>{ buttons }</td>
          </tr>
        )));
    return (
      <table className="table">
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
          { tableBody }
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (item) => dispatch(removeGlobalExpense(item)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
