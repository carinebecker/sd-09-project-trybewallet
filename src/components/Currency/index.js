import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Currency extends Component {
  render() {
    const { fieldContent, onChange, currencies } = this.props;
    return (
      <div>
        <span>Moeda:</span>
        <select
          name="currency"
          id="input-currency"
          data-testid="currency-input"
          value={ fieldContent }
          onChange={ onChange }
          className="currency-input"
          required
        >
          {currencies
            .filter((currency) => currency !== 'USDT')
            .map((currency, index) => (
              <option
                key={ index }
                data-testid={ currency }
              >
                { currency }
              </option>
            ))}
        </select>
      </div>
    );
  }
}

Currency.propTypes = {
  fieldContent: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Currency;
