import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPrice, saveExpense, deleteExpense, editExpense } from '../actions';

const Alimentacao = 'Alimentação';
const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagInput1 = [Alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
let expensesTotal = 0;
const DEFAULT_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: Alimentacao,
};
const headerTable = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      editing: false,
      idToEdit: '',
      id: 0,
      ...DEFAULT_STATE,
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

  handleDelete(i) {
    const { deleteExpenseKey } = this.props;
    deleteExpenseKey(i);
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
              onClick={ () => this.handleDelete(id) }
            >
              Deletar
            </button>
          </td>
        </tr>
      );
    });
  }

  saveEditedExpense(idToEdit) {
    const { editExpenseKey } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    this.handleDelete(idToEdit);
    editExpenseKey({
      id,
      value,
      description,
      currency,
      method,
      tag,
    }, idToEdit);
  }

  handleClick() {
    const { editing, idToEdit, id, value, description,
      currency, method, tag } = this.state;
    const { saveExpenseKey, fetchPriceKey } = this.props;
    if (editing) {
      this.saveEditedExpense(idToEdit);
      this.setState(() => ({ ...DEFAULT_STATE, id }));
    } else {
      fetchPriceKey();
      saveExpenseKey({
        id,
        value,
        description,
        currency,
        method,
        tag,
      });
      this.setState((prevState) => ({
        ...DEFAULT_STATE,
        id: prevState.id + 1,
      }));
    }
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
          {e.length && this.createBody(e)}
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
    const { value, description, editing } = this.state;
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
            {this.dropDown(currencies, 'currency')}
            {this.dropDown(paymentMethod, 'method')}
            {this.dropDown(tagInput1, 'tag')}
            <button
              type="button"
              onClick={ this.handleClick }
            >
              { !editing ? 'Adicionar despesa' : 'Editar despesa' }
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
  deleteExpenseKey: (id) => dispatch(deleteExpense(id)),
  editExpenseKey: (obj, idToEdit) => dispatch(editExpense(obj, idToEdit)),
});
Wallet.propTypes = { email: PropTypes.string }.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
