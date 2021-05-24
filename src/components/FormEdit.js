import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpenseSave as editExpenseSaveAction } from '../actions';

class FormEdit extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleState = this.handleState.bind(this);
    this.inputCurrencyOptions = this.inputCurrencyOptions.bind(this);
    this.inputPaymentMethod = this.inputPaymentMethod.bind(this);
    this.inputExpenseType = this.inputExpenseType.bind(this);
  }

  componentDidMount() {
    this.handleState();
  }

  handleState() {
    const { expense } = this.props;
    this.setState({
      ...expense,
    });
  }

  handleClick() {
    const { editExpenseSave } = this.props;
    const expense = this.state;
    editExpenseSave(expense);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  inputCurrencyOptions() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="input-currency">
        Moeda:
        <select
          name="currency"
          id="input-currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {(currencies).map((currencyInitials, index) => (
            <option
              key={ index }
              value={ currencyInitials }
              data-testid={ currencyInitials }
            >
              {currencyInitials}
            </option>))}
        </select>
      </label>
    );
  }

  inputPaymentMethod() {
    const methodList = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { method } = this.state;
    return (
      <label htmlFor="input-method">
        Método de pagamento:
        <select
          name="method"
          id="input-method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          {methodList.map((item, index) => (
            <option
              key={ index }
              value={ item }
            >
              {item}
            </option>))}
        </select>
      </label>
    );
  }

  inputExpenseType() {
    const type = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="input-tag">
        Tag:
        <select
          name="tag"
          id="input-tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          {type.map((item) => <option key={ item } value={ item }>{item}</option>)}
        </select>
      </label>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <label htmlFor="input-value">
          Valor:
          <input
            type="number"
            id="input-value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="input-description">
          Descrição:
          <input
            type="text"
            id="input-description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        {this.inputCurrencyOptions()}
        {this.inputPaymentMethod()}
        {this.inputExpenseType()}
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expense } }) => ({
  currencies,
  expense,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenseSave: (expense) => dispatch(editExpenseSaveAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);

FormEdit.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
  expense: PropTypes.arrayOf(PropTypes.object).isRequired,
  editExpenseSave: PropTypes.func.isRequired,
};
