import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPrice, saveExpense } from '../actions';

const Alimentacao = 'Alimentação';

const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagInput1 = [Alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const currencyInput = 'currency';
const methodInput = 'method';
const tagInput = 'tag';
let expensesTotal = 0;

const headerTable = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
    };
  }

  componentDidMount() {
    const { fetchPriceKey } = this.props;
    fetchPriceKey();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  createTable(array) {
    return array.map((item, i) => (
      <th key={ i }>{item}</th>
    ));
  }

  createBody(e) {
    return e.map((expense, index) => {
      const { description, tag, method, value, currency, 
        exchangeRates, id } = expense;
      const { ask, name } = exchangeRates[currency];
      return (
        <tr key={ index }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{name}</td>
          <td>{parseFloat(ask).toFixed(2)}</td>
          <td>{(parseFloat(ask) * value).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              data-testid="edit-btn"
              type="button"
              id={ id }
              onClick={ () => this.handleEditClick(id) }
            >
              Editar
            </button>
            <button
              data-testid="delete-btn"
              type="button"
              id={ id }
              onClick={ () => this.handleClick(id) }
            >
              Deletar
            </button>
          </td>
        </tr>
      );
    });
  }

  handleClick() {
    const { saveExpenseKey, fetchPriceKey } = this.props;
    fetchPriceKey();
    saveExpenseKey(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
    }));
  }

  dropDown(c, name) {
    return (
      <select
        data-testid={ `${name}-input` }
        onChange={ this.handleChange }
        name={ name }
      >
        {c.map((info, counter) => (
          <option
            data-testid={ info }
            key={ counter }
          >
            { info }
          </option>
        ))}
      </select>
    );
  }

  tableExpenses(e) {
    return (
      <table>
        <thead>
          <tr>
            {this.createTable(headerTable)}
          </tr>
        </thead>
        <tbody>
          {this.createBody(e)}
        </tbody>
      </table>
    );
  }

  totalSumExpenses(e) {
    return e.reduce((total, expense) => {
      const tempValue = expense.exchangeRates[expense.currency].ask;
      return total + (tempValue * expense.value);
    }, 0);
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description } = this.state;

    if (expenses.length) {
      expensesTotal = this.totalSumExpenses(expenses);
    }

    if (currencies) {
      return (
        <div>
          <header>
            <p data-testid="email-field">{email}</p>
            <p data-testid="total-field">{expensesTotal}</p>
            <p data-testid="header-currency-field">BRL</p>
          </header>
          <form>
            <input
              data-testid="value-input"
              type="number"
              name="value"
              onChange={ this.handleChange }
              value={ value }
            />
            <input
              data-testid="description-input"
              type="text"
              name="description"
              onChange={ this.handleChange }
              value={ description }
            />
            {this.dropDown(currencies, currencyInput)}
            {this.dropDown(paymentMethod, methodInput)}
            {this.dropDown(tagInput1, tagInput)}
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </form>
          {this.tableExpenses(expenses)}
        </div>
      );
    }
    return <p>Loading...</p>;
  }
}

const mapStateToProps = (props) => {
  console.log('');
  return ({
    email: props.user.email,
    currencies: props.wallet.currencies,
    expenses: props.wallet.expenses,
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchPriceKey: () => dispatch(fetchPrice()),
  saveExpenseKey: (obj) => dispatch(saveExpense(obj)),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
