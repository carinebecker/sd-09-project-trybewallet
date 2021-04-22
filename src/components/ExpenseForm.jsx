import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencyData as fetchCurrencyDataAction,
} from '../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      count: 0,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { value, description, currency, method, tag, count } = this.state;
    const { fetchCurrencyData } = this.props;

    const expenseData = {
      value,
      description,
      currency,
      method,
      tag,
      id: count,
      exchangeRates: '',
    };

    fetchCurrencyData(expenseData);

    this.setState({
      count: count + 1,
    });

    this.resetState();
  }

  resetState() {
    this.setState((state) => ({
      ...state,
      value: '',
      description: '',
    }));
  }

  renderCurrencies() {
    const { currencies } = this.props;
    const curr = currencies.map((element) => (
      <option
        value={ element }
        data-testid={ element }
        key={ element }
      >
        { element }
      </option>
    ));
    return curr;
  }

  renderMethod() {
    const methodArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      methodArray.map((element) => (
        <option
          value={ element }
          key={ element }
        >
          { element }
        </option>
      ))
    );
  }

  renderTag() {
    const tagArray = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      tagArray.map((e) => (
        <option
          value={ e }
          key={ e }
        >
          { e }
        </option>
      ))
    );
  }

  renderForm() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <input
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ (event) => this.handleChange(event) }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ (event) => this.handleChange(event) }
        >
          { this.renderCurrencies() }
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (event) => this.handleChange(event) }
        >
          { this.renderMethod() }
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ (event) => this.handleChange(event) }
        >
          { this.renderTag() }
        </select>
        <button
          type="button"
          onClick={ () => this.handleClick() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }

  render() {
    const { renderForm } = this;
    const { isEdit } = this.props;

    return (
      <span>
        {
          !(isEdit) ? renderForm() : <span>Editando</span>
        }
      </span>
    );
  }
}

ExpenseForm.propTypes = {
  fetchCurrencyData: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEdit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEdit: state.wallet.isEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyData: (currencyData) => dispatch(fetchCurrencyDataAction(currencyData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
