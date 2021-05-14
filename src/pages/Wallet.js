import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies, updateTotal } from '../actions';
import Table from '../components/Table';
import EditForm from '../components/EditForm';
import trybeWallet from '../images/trybe_small.png';
import '../App.css';
import fetchCurrenciesAPI from '../services';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  methods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  tags: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
};
class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.expenseForm = this.expenseForm.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  componentDidMount() { this.getCurrencies(); }

  componentDidUpdate() { this.renderHeader(); }

  async getCurrencies() {
    const { getCurrenciesAPI } = this.props;
    await getCurrenciesAPI();
  }

  expenseForm() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, methods, tags } = this.state;
    return (
      <section>
        <form className="expense-form">
          <div>
            {this.renderInput('Valor', 'number', 'value', value)}
            {this.renderInput('Descrição', 'text', 'description', description)}
            {this.renderSelect('Moedas', 'currency', currencies, currency)}
            {this.renderSelect(
              'Forma de pagamento',
              'method',
              methods,
              method,
            )}
            {this.renderSelect('Categorias', 'tag', tags, tag)}
          </div>
          <button
            type="button"
            onClick={ this.saveExpense }
            className="expense-form-button"
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  saveExpense() {
    const { saveExpense, total, updateTotalExpenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    fetchCurrenciesAPI().then((result) => {
      const { expenses } = this.props;
      const newExpense = {
        id: expenses.length,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: result,
      };
      const rates = newExpense.exchangeRates;
      const convertedValue = (parseFloat(rates[currency].ask)
        * parseFloat(value)).toFixed(2);
      this.setState(INITIAL_STATE);
      updateTotalExpenses(parseFloat(total) + parseFloat(convertedValue));
      saveExpense(newExpense);
    });
  }

  totalExpenses() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const total = expenses.reduce(
        (
          accumulatedTotal,
          { value, currency, exchangeRates },
        ) => parseFloat(accumulatedTotal)
          + parseFloat(value) * exchangeRates[currency].ask,
        0,
      ).toFixed(2);
      return total;
    }
    return 0;
  }

  // Baseado na solução do Felipe Rocha
  renderInput(label, type, name, value) {
    return (
      <label htmlFor={ name }>
        {`${label}:`}
        <input
          className="expense-form-input"
          name={ name }
          id={ name }
          onChange={ this.handleChange }
          type={ type }
          value={ value }
          data-testid={ `${name}-input` }
        />
      </label>
    );
  }

  // Baseado na solução do Felipe Rocha
  renderSelect(label, name, options, value) {
    return name === 'currency'
      ? (
        <div>
          {`${label}:`}
          <select
            className="expense-form-input"
            name={ name }
            onChange={ this.handleChange }
            value={ value }
            data-testid="currency-input"
          >
            {options.filter((curr) => curr !== 'USDT')
              .map((curr) => (
                <option key={ curr } data-testid={ curr }>{curr}</option>
              ))}
          </select>
        </div>
      )
      : (
        <div>
          {`${label}:`}
          <select
            className="expense-form-input"
            name={ name }
            onChange={ this.handleChange }
            value={ value }
            data-testid={ `${name}-input` }
          >
            {options.map((curr) => (<option key={ curr }>{curr}</option>))}
          </select>
        </div>
      );
  }

  renderHeader() {
    const { email } = this.props;
    return (
      <header className="header-content">
        <img alt="Trybe Wallet" src={ trybeWallet } />
        <span data-testid="email-field">{`User: ${email}`}</span>
        <span data-testid="header-currency-field">Câmbio: BRL</span>
        <span data-testid="total-field">
          {`Despesa total: ${this.totalExpenses()}`}
        </span>
      </header>
    );
  }

  render() {
    const { isEditing } = this.props;
    return (
      <main>
        {this.renderHeader()}
        {!isEditing ? this.expenseForm() : (<EditForm />)}
        <Table />
      </main>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  isEditing: wallet.isEditing,
  total: wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesAPI: () => dispatch(fetchCurrencies()),
  saveExpense: (expense) => dispatch(addExpense(expense)),
  updateTotalExpenses: (total) => dispatch(updateTotal(total)),
});

Wallet.propTypes = {
  currencies: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrenciesAPI: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  saveExpense: PropTypes.func.isRequired,
  total: PropTypes.string.isRequired,
  updateTotalExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
