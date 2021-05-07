import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenseData, fetchCurrencyTypes } from '../actions';

import CurrencySelect from './CurrencySelect';
import MethodSelect from './MethodSelect';
import CategorySelect from './CategorySelect';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tag: '',
      method: '',
      value: 0,
      currency: '',
      currencyTypes: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickButtonAddExpenses = this.handleClickButtonAddExpenses.bind(this);
  }

  componentDidMount() {
    this.updatesCurrencyTypesState();
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  updatesCurrencyTypesState() {
    const { currencies } = this.props;
    this.setState(() => ({
      currency: currencies[0].code,
      value: 0,
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencyTypes: currencies,
    }));
  }

  updatesCurrencies() {
    const { currencies } = this.props;
    this.setState(() => ({
      currencyTypes: currencies,
    }));
  }

  handleClickButtonAddExpenses() {
    const { setExpenses, getCurrencyTypes } = this.props;
    getCurrencyTypes();
    this.updatesCurrencies();
    const { value, currency, method, tag, description, currencyTypes } = this.state;
    const expenseEntry = {
      id: '0',
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencyTypes,
    };
    setExpenses(expenseEntry);
  }

  render() {
    const { value, description, currency, method, tag, currencyTypes } = this.state;

    return (
      <form className="container-form" action="">
        <label htmlFor="value">
          Valor:
          <input
            className="input-value"
            id="value"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleInputChange }
            data-testid="value-input"
          />
        </label>
        <CurrencySelect
          currencyTypes={ currencyTypes }
          onChange={ this.handleInputChange }
          currency={ currency }
        />
        <MethodSelect onChange={ this.handleInputChange } method={ method } />
        <CategorySelect onChange={ this.handleInputChange } tag={ tag } />
        <label htmlFor="description">
          Descricao:
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleInputChange }
            data-testid="description-input"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClickButtonAddExpenses }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencyTypes: () => dispatch(fetchCurrencyTypes()),
  setExpenses: (expenseEntry) => dispatch(saveExpenseData(expenseEntry)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrencyTypes: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
