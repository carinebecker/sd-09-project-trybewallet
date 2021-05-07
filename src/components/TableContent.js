import React from 'react';
import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';
import PropTypes from 'prop-types';

class TableContent extends React.Component {
  /* filterCurrencyName(currency) {
    const index = currency.indexOf('/');
    return currency.slice(0, index);
  } */

  convertCurrency(currentCurrency, conversionCurrency) {
    const convertedValue = parseFloat(currentCurrency) * parseFloat(conversionCurrency);
    return convertedValue.toFixed(2);
  }

  render() {
    const { expense } = this.props;
    const { description, tag, method, value, currency, exchangeRates } = expense;
    const currentCurrency = exchangeRates[currency];
    console.log('table content');
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currentCurrency.name }</td>
        {/* <td>{ this.filterCurrencyName(currentCurrency.name) }</td> */}
        <td>{ parseFloat(currentCurrency.ask).toFixed(2) }</td>
        <td>{ this.convertCurrency(value, currentCurrency.ask) }</td>
        <td>Real</td>
        <td>
          <button type="button" className="edit-btn btn" data-testid="edit-btn">
            <RiEdit2Fill color="rgb(255, 255, 255)" />
          </button>
          <button type="button" className="remove-btn btn" data-testid="delete-btn">
            <RiDeleteBin2Fill color="rgb(255, 255, 255)" />
          </button>
        </td>
      </tr>
    );
  }
}

TableContent.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.string,
    currency: PropTypes.string,
    exchangeRates: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default TableContent;
