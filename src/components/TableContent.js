import React from 'react';
import PropTypes from 'prop-types';

class TableContent extends React.Component {
  convertCurrency(currentCurrency, conversionCurrency) {
    const convertedValue = parseFloat(currentCurrency) * parseFloat(conversionCurrency);
    return convertedValue.toFixed(2);
  }

  render() {
    const { expense, onclick, onclickEdit } = this.props;
    const { id, description, tag, method, value, currency, exchangeRates } = expense;
    const currentCurrency = exchangeRates[currency];
    console.log('table content');
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currentCurrency.name }</td>
        <td>{ parseFloat(currentCurrency.ask).toFixed(2) }</td>
        <td>{ this.convertCurrency(value, currentCurrency.ask) }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            className="edit-btn btn"
            data-testid="edit-btn"
            onClick={ () => onclickEdit(id) }
          >
            🖋
          </button>
          <button
            type="button"
            className="remove-btn btn"
            data-testid="delete-btn"
            onClick={ () => onclick(id) }
          >
            ✖
          </button>
        </td>
      </tr>
    );
  }
}

TableContent.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.string,
    currency: PropTypes.string,
    exchangeRates: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onclick: PropTypes.func.isRequired,
  onclickEdit: PropTypes.func.isRequired,
};

export default TableContent;
