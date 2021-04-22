import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <div>
        <select
          data-testid="method-input"
          name="method"
          id="method-input"
          defaultValue="default"
          onChange={ (e) => handleChange(e.target) }
        >
          <option disabled value="default"> -- Selecione uma opção -- </option>
          <option value="Dinheiro"> Dinheiro </option>
          <option value="Cartão de crédito"> Cartão de crédito </option>
          <option value="Cartão de débito"> Cartão de débito </option>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
          defaultValue="default"
          onChange={ (e) => handleChange(e.target) }
        >
          <option disabled value="default"> -- Selecione uma opção -- </option>
          <option value="Alimentação"> Alimentação </option>
          <option value="Lazer"> Lazer </option>
          <option value="Trabalho"> Trabalho </option>
          <option value="Transporte"> Transporte </option>
          <option value="Saúde"> Saúde </option>
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
