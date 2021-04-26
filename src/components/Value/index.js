import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Value extends Component {
  render() {
    const { fieldContent, onChange } = this.props;
    return (
      <label htmlFor="valor">
        Valor:
        <input
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ onChange }
          value={ fieldContent }
          required
          className="value-input"
        />
      </label>
    );
  }
}

Value.propTypes = {
  fieldContent: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Value;
