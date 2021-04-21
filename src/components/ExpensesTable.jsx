import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableContent: [],
      isNewContent: false,
    };

    this.generateTableContent = this.generateTableContent.bind(this);
    this.setNewContent = this.setNewContent.bind(this);
  }

  componentDidUpdate() {
    const { isFetching } = this.props;
    const { isNewContent } = this.state;
    if (isFetching && !isNewContent) {
      this.setNewContent();
    }
    if (!isFetching && isNewContent) {
      this.generateTableContent();
    }
  }

  setNewContent() {
    this.setState({ isNewContent: true });
  }

  generateTableContent() {
    const { expenses } = this.props;
    const tableContent = expenses.map((expense) => {
      const { description, tag, method, value, exchangeRates, currency } = expense;
      const formattedValue = `${currency} ${Number(value).toFixed(2)}`;
      const currencyName = exchangeRates[currency].name.split('/')[0];
      let exchange = exchangeRates[currency].ask;
      const exchangedValue = Math.round((value * exchange) * 100) / 100;
      exchange = Math.round(exchangeRates[currency].ask * 100) / 100;
      const exchangedCurrency = 'Real';
      const buttons = (
        <td>
          <button type="button"> Editar </button>
          <button data-testid="delete-btn" type="button">
            Deletar
          </button>
        </td>
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
          <tr className="description-container">
            {tableContent.map(({ description: d }, i) => (<td key={ i }>{ d }</td>))}
          </tr>
          <tr className="tag-container">
            {tableContent.map(({ tag }, index) => (<td key={ index }>{ tag }</td>))}
          </tr>
          <tr className="method-container">
            {tableContent.map(({ method }, index) => (<td key={ index }>{ method }</td>))}
          </tr>
          <tr className="value-container">
            {tableContent.map(({ formatedValue: fv }, i) => (<td key={ i }>{ fv }</td>))}
          </tr>
          <tr className="currency-container">
            {tableContent.map(({ currencyName: cn }, i) => (<td key={ i }>{ cn }</td>))}
          </tr>
          <tr className="exchange-container">
            {tableContent.map(({ exchange }, i) => (<td key={ i }>{ exchange }</td>))}
          </tr>
          <tr className="exchanged-value-container">
            {tableContent.map(({ exchangedValue: ev }, i) => (<td key={ i }>{ ev }</td>))}
          </tr>
          <tr className="exchange-currency-conteiner">
            {tableContent.map(({ exchangedCurrency: e }, i) => (
              <td key={ i }>{ e }</td>))}
          </tr>
          <tr className="controls-container">
            {tableContent.map(({ buttons }) => buttons)}
          </tr>
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isFetching: state.wallet.isFetching,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
