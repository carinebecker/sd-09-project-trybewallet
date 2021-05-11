import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../Api';
import Select from './Select';
import { agroupCurrencies, addExpense, sumExpenses } from '../actions';

const paymentOptions = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];
const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const INITIAL_STATE = {
  id: 0,
  value: 0.00,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: tagOptions[0],
};

class FormAddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Depois do compomente ir pro dom, pega o grupo de moedas do redux como props, usando a api
  async componentDidMount() {
    const { agroupCurrenciesToRedux } = this.props;
    const currencies = await getCurrencies();
    agroupCurrenciesToRedux(Object.keys(currencies));
  }

  // Atualiza estado dos inputs
  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // Atualiza os estados de acordo com o click no botão,.
  // faz a conversão dos valores e envia pro header.
  async handleClick(event) {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpenseToRedux } = this.props;
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
    addExpenseToRedux(expensesAdd);
    this.setState({
      id: id + 1,
      value: 0.00,
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
        <form id="add-expense-form">
          <input
            data-testid="value-input"
            name="value"
            type="text"
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
          />
          <Select
            textLabel="Moedas:"
            name="currency"
            onChange={ this.handleChange }
            options={ currencies }
          />
          <Select
            textLabel="Método de Pagamento:"
            name="method"
            onChange={ this.handleChange }
            options={ paymentOptions }
          />
          <Select
            textLabel="Categoria da Despesa:"
            name="tag"
            onChange={ this.handleChange }
            options={ tagOptions }
          />
          <button
            type="submit"
            name="btn"
            onClick={ this.handleClick }
          >
            Adicionar despesa :
          </button>
        </form>
      </div>

    );
  }
}

FormAddExpense.propTypes = {
  agroupCurrenciesToRedux: PropTypes.func,
  addExpenseToRedux: PropTypes.func,
  sumExpensesToRedux: PropTypes.func,
  currencies: PropTypes.arrayOf(),
}.isRequired;
// MapState - leitura do estado via props

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

// Manda tudo pra store
const mapDispatchToProps = (dispatch) => ({
  addExpenseToRedux: (expenses) => dispatch(addExpense(expenses)),
  agroupCurrenciesToRedux: (currencies) => dispatch(agroupCurrencies(currencies)),
  sumExpensesToRedux: (value) => dispatch(sumExpenses(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddExpense);

// Consultei repositório do colega Layo Kaminski
