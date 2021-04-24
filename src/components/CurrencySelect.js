import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class CurrencySelect extends React.Component {
  render() {
    const { onChange, currency } = this.props;
    return (
      <div>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ onChange }
          >
            <option value="brl" data-testid="BRL">BRL</option>
          </select>
        </label>
      </div>
    );
  }
}

export default CurrencySelect;
