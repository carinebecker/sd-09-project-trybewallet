import React from 'react';
import PropTypes from 'prop-types';

class CurrencySelect extends React.Component {
  render() {
    const { currencyTypes, onChange, currency } = this.props;
    const typeOptions = currencyTypes.map(({ code }) => (
      <option key={ code } value={ code } data-testid={ code }>{ code }</option>
    ));
    return (
      <div>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            onChange={ onChange }
            value={ currency }
            data-testid="currency-input"
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
    }),
  ).isRequired,
};

export default CurrencySelect;
