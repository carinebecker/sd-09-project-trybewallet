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
      const formatedValue = `${currency} ${Number(value).toFixed(2)}`;
      const currencyName = exchangeRates[currency].name.split('/')[0];
      let exchange = exchangeRates[currency].ask;
      const exchangedValue = Math.round((value * exchange) * 100) / 100;
      exchange = Math.round(exchangeRates[currency].ask * 100) / 100;
      const exchangedCurrency = 'Real';
      return {
        description,
        tag,
        method,
        formatedValue,
        currencyName,
        exchange,
        exchangedValue,
        exchangedCurrency,
      };
    });
    this.setState({ tableContent, isNewContent: false });
  }

  render() {
    const { tableContent } = this.state;
    return (
      <div className="table-container">
        <div className="description-container">
          {tableContent.map(({ description }, index) => (
            <p key={ index }>{ description }</p>))}
        </div>
        <div className="tag-container">
          {tableContent.map(({ tag }, index) => (
            <p key={ index }>{ tag }</p>))}
        </div>
        <div className="method-container">
          {tableContent.map(({ method }, index) => (
            <p key={ index }>{ method }</p>))}
        </div>
        <div className="value-container">
          {tableContent.map(({ formatedValue }, index) => (
            <p key={ index }>{ formatedValue }</p>))}
        </div>
        <div className="currency-container">
          {tableContent.map(({ currencyName }, index) => (
            <p key={ index }>{ currencyName }</p>))}
        </div>
        <div className="exchange-container">
          {tableContent.map(({ exchange }, index) => (
            <p key={ index }>{ exchange }</p>))}
        </div>
        <div className="exchanged-value-container">
          {tableContent.map(({ exchangedValue }, index) => (
            <p key={ index }>{ exchangedValue }</p>))}
        </div>
        <div className="exchange-currency-conteiner">
          {tableContent.map(({ exchangedCurrency }, index) => (
            <p key={ index }>{ exchangedCurrency }</p>))}
        </div>
        <div className="controls-container">
          {tableContent.map((_, index) => (
            <div key={ (Math.random() * 100) }>
              <button type="button" key={ (Math.random() * 100) }> Editar </button>
              <button data-testid="delete-btn" type="button" key={ index }>
                Deletar
              </button>
            </div>
          ))}
        </div>
      </div>
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
