import React from 'react';
import PropTypes from 'prop-types';

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
            onChange={ onChange }
            value={ method }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }
}

MethodSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
};

export default MethodSelect;
