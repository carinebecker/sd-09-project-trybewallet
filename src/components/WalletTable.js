import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletTable extends React.Component {
  handleConversion(exchangeRates, value, currency) {
    const foundCurrency = Object.values(exchangeRates).find(
      (searchingCurrency) => searchingCurrency.code === currency,
    );
    const exchangeCurrencyName = (foundCurrency.name).split('/')[0];
    const exchangeCurrencyAsk = parseFloat(foundCurrency.ask);
    const exchangedValue = exchangeCurrencyAsk * parseFloat(value);
    return { exchangeCurrencyName, exchangeCurrencyAsk, exchangedValue };
  }

  handleExchangeInfo() {
    const { expenses } = this.props;

    return expenses.map((expense) => {
      const { id, value, exchangeRates, description, currency, method, tag } = expense;
      const conversion = this.handleConversion(exchangeRates, value, currency);
      const { exchangeCurrencyName, exchangeCurrencyAsk, exchangedValue } = conversion;
      const fixedCurrencyAsk = parseFloat(exchangeCurrencyAsk).toFixed(2);
      const fixedExchangedValue = exchangedValue.toFixed(2);
      const allTableData = {
        id,
        description,
        tag,
        method,
        value,
        exchangeCurrencyName,
        fixedCurrencyAsk,
        fixedExchangedValue,
        'Moeda de conversão': 'Real',
      };
      return allTableData;
    });
  }

  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    const { expenses, deleteRow } = this.props;

    return (
      <table>
        <thead>
          <tr>
            {tableHeaders.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          { expenses.length > 0
            ? this.handleExchangeInfo().map((expense) => (
              <tr key={ expense.id }>
                {Object.values(expense).map((item) => <td key={ item }>{item}</td>)}
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteRow(expense.id, expense.fixedExchangedValue) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
            : ''}
        </tbody>
      </table>);
  }
}

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteRow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps, null)(WalletTable);
