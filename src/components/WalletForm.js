import React from 'react';
import PropTypes from 'prop-types';

class WalletForm extends React.Component {
  createInputValue(handleChange) {
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          id="value"
          name="value"
          data-testid="value-input"
          onChange={ handleChange }
        />
      </label>
    );
  }

  createInputDescription(handleChange) {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          id="description"
          name="description"
          data-testid="description-input"
          onChange={ handleChange }
        />
      </label>
    );
  }

  createSelectCurrency(currenciesArray, handleChange) {
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          data-testid="currency-input"
          name="currency"
          onChange={ handleChange }
        >
          <option>Selecione uma Moeda</option>
          {currenciesArray.map((currency) => (
            <option key={ currency } data-testid={ currency }>
              {currency}
            </option>
          ))}
        </select>
      </label>
    );
  }

  createSelectPayment(paymentArray, handleChange) {
    return (
      <label htmlFor="payment">
        Método de Pagamento:
        <select
          id="payment"
          data-testid="method-input"
          name="method"
          onChange={ handleChange }
        >
          <option>Selecione um Meio de Pagamento</option>
          {paymentArray.map((item) => <option key={ item }>{item}</option>)}
        </select>
      </label>
    );
  }

  createSelectTag(tagsArray, handleChange) {
    return (
      <label htmlFor="tags">
        Tag para a despesa:
        <select
          id="tags"
          data-testid="tag-input"
          name="tag"
          onChange={ handleChange }
        >
          <option>Selecione uma Tag</option>
          {tagsArray.map((item) => <option key={ item }>{item}</option>)}
        </select>
      </label>
    );
  }

  render() {
    const { selectCurrency, handleChange, submitFunction } = this.props;
    const currenciesArray = Object.keys(selectCurrency);
    const paymentArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagsArray = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        {this.createInputValue(handleChange)}
        {this.createInputDescription(handleChange)}
        {this.createSelectCurrency(currenciesArray, handleChange)}
        {this.createSelectPayment(paymentArray, handleChange)}
        {this.createSelectTag(tagsArray, handleChange)}
        <button
          type="button"
          onClick={ submitFunction }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  selectCurrency: PropTypes.objectOf(Array).isRequired,
  handleChange: PropTypes.func.isRequired,
  submitFunction: PropTypes.func.isRequired,
};

export default WalletForm;
