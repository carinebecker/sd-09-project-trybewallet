import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormButtons extends Component {
  render() {
    const { generateExchangeRates } = this.props;
    return (
      <div>
        <button
          type="button"
          onClick={ generateExchangeRates }
        >
          Adicionar despesa
        </button>
        <button
          type="button"
          onClick={ generateExchangeRates }
        >
          Editar despesa
        </button>
      </div>
    );
  }
}

FormButtons.propTypes = {
  generateExchangeRates: PropTypes.func,
}.isRequired;
