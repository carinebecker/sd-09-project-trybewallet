import React from 'react';
import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';
import PropTypes from 'prop-types';

class TableContent extends React.Component {
  filterCurrencyName(currency, isCurrentCurrency) {
    const index = currency.indexOf('/');
    if (isCurrentCurrency) {
      return currency.slice(0, index);
    }
    return currency.slice(index + 1, currency.length);
  }

  convertCurrency(currentCurrency, conversionCurrency) {
    const convertedValue = parseFloat(currentCurrency) * parseFloat(conversionCurrency);
    return convertedValue.toFixed(2);
  }

  render() {
    const { expense } = this.props;
    const { description, tag, method, value, currency, exchangeRates } = expense;
    const currentCurrency = exchangeRates.find(({ code }) => code === currency);
    console.log('table content');
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currency }</td>
        <td>{ this.filterCurrencyName(currentCurrency.name, true) }</td>
        <td>{ this.convertCurrency(value, currentCurrency.ask) }</td>
        <td>{ this.filterCurrencyName(currentCurrency.name, false) }</td>
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
