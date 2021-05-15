import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletTable extends React.Component {

  handleConversion(id, exchangeRates, value, currency) {
    const foundCurrency = Object.values(exchangeRates).filter(
      (searchingCurrency) => {
        console.log(searchingCurrency.code)
        console.log(currency)
        return searchingCurrency.code === currency;
      },
    );
    const exchangeCurrencyName = foundCurrency[id].name;
    const exchangeCurrencyAsk = foundCurrency[id].ask;
    const exchangedValue = foundCurrency[id].ask * value;
    return { exchangeCurrencyName, exchangeCurrencyAsk, exchangedValue };
  }

  handleExchangeInfo() {
    const { expenses } = this.props;
    expenses.map((expense) => {
      const { id, value, exchangeRates, description, currency, method, tag } = expense;
      const conversion = this.handleConversion(id, exchangeRates, value, currency);
      const { exchangeCurrencyName, exchangeCurrencyAsk, exchangedValue } = conversion;
      const fixedExchangedValue = exchangedValue.toFixed(2);
      const allTableData = {
        description,
        tag,
        method,
        value,
        exchangeCurrencyName,
        exchangeCurrencyAsk,
        fixedExchangedValue,
        'Moeda de conversão': 'Real Brasileiro',
      };
      console.log(expenses)
      return allTableData;
    });
  }

  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {tableHeaders.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          { expenses.length > 0
            ? Object.values(this.handleExchangeInfo()).map(
              (item) => <td key={ item }>{item}</td>,
            )
            : ''}
        </tbody>
      </table>);
  }
}

// WalletTable.propTypes = {
//   expenses: PropTypes.arrayOf(Object).isRequired,
// };

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps, null)(WalletTable);
