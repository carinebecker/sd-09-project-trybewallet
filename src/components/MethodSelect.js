import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class MethodSelect extends React.Component {
  render() {
    const { onChange, method } = this.props;
    return (
      <div>
        <label htmlFor="method">
          Metodo de pagamento
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ onChange }
            data-testid="method-input"
          >
            <option value="cash">Dinheiro</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }
}

export default MethodSelect
