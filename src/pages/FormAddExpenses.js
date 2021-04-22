import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from './Select';
import { agroupCurrencies, addExpense, sumExpenses } from '../actions';
import getCurrencies from '../Api';

const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const INITIAL_STATE = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: tagOptions[0],
};

class FormAddExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.setState = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const { agroupCurrenciesToRedux } = this.props;
    const currencies = await getCurrencies();
    agroupCurrenciesToRedux(currencies);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpenseToRedux, sumExpensesToRedux } = this.props;
    const exchangeRates = await getCurrencies();
    const expensesAdd = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const currencyIndex = Object.keys(exchangeRates).indexOf(currency);
    const quotation = Object.values(exchangeRates)[currencyIndex].ask;
    const valueForQuotation = parseFloat(value) * parseFloat(quotation);
    addExpenseToRedux(expensesAdd);
    sumExpensesToRedux(valueForQuotation);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagOptions[0],
    });
    const form = document.getElementById('add-expense-form');
    form.reset();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          Valor
          <input
            data-testid="value-input"
            name="value"
            type="text"
            onChange={ this.handleChange }
          />
          Moeda
          <input
            data-testid="description-input"
            name="description"
            type="text"
            onChange={ this.handleChange }
          />
          <Select
            textLabel="Método de Pagamento:"
            name="method"
            options={ paymentOptions }
            onChange={ this.handleChange }
          />
          <Select
            textLabel="Moedas:"
            name="currency"
            onChange={ this.handleChange }
            options={ Object.keys(currencies) }
          />
          <Select
            textLabel="Categoria da Despesa:"
            name="tag"
            options={ tagOptions }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

FormAddExpenses.propTypes = {
  agroupCurrenciesToRedux: PropTypes.func.isRequired,
  addExpenseToRedux: PropTypes.func.isRequired,
  sumExpensesToRedux: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseToRedux: (expenses) => dispatch(addExpense(expenses)),
  agroupCurrenciesToRedux: (currencies) => dispatch(agroupCurrencies(currencies)),
  sumExpensesToRedux: (value) => dispatch(sumExpenses(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddExpenses);
