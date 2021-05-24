import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputExpenses extends Component {
  render() {
    const { value, valueChangeHandler } = this.props;
    return (
      <div>
        <label htmlFor={ `value-input-${value}` }>
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ valueChangeHandler }
          />
        </label>
      </div>

    );
  }
}

InputExpenses.propTypes = {
  valueChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};
