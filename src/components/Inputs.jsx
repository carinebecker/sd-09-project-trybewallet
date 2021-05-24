import React, { Component } from 'react';
import { func, number, arrayOf, string } from 'prop-types';

class Inputs extends Component {
  valueInput() {
    const { value, handleChange } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            id="value-input"
            value={ value }
            data-testid="value-input"
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }

  currencyInput() {
    const { currencies, currency, handleChange } = this.props;
    return (
      <div>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            name="currency"
            value={ currency }
            onChange={ handleChange }
            data-testid="currency-input"
          >
            {currencies.map((coin) => (
              <option
                key={ coin }
                value={ coin }
                data-testid={ coin }
              >
                { coin }
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  methodInput() {
    const { method, handleChange } = this.props;
    return (
      <div>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            id="method-input"
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }

  tagInput() {
    const { tag, handleChange } = this.props;
    return (
      <div>
        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  descriptionInput() {
    const { description, handleChange } = this.props;
    return (
      <div>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }

  render() {
    return (
      <div className="flexbox">
        {this.valueInput()}
        {this.currencyInput()}
        {this.methodInput()}
        {this.tagInput()}
        {this.descriptionInput()}
      </div>
    );
  }
}

Inputs.propTypes = {
  value: number,
  currency: string,
  currencies: arrayOf(string),
  method: string,
  tag: string,
  description: string,
  handleChange: func,
}.isRequired;

export default Inputs;
