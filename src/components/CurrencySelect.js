import React from 'react';
import PropTypes from 'prop-types';

class CurrencySelect extends React.Component {
  render() {
    const { onChange, currency, currencyTypes } = this.props;
    const typeOptions = currencyTypes.map(({ code }) => 
      <option key={ code } value={ currency } data-testid={ currency }>{ code }</option>
    );
    return (
      <div>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ onChange }
          >
            {typeOptions}
          </select>
        </label>
      </div>
    );
  }
}

CurrencySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  currencyTypes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
    }).isRequired,
  ),
};

/* product: PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}).isRequired, */

export default CurrencySelect;
