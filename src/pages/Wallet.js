import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ExpenseList from './WalletRegistry';
import { editedExpense, getMoneyInfo, walletUpdate } from '../actions/index';
import WalletRegistry from './WalletRegistry';
import './Wallet.css';
import moneyData from '../services/api';

const initialState = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      total: 0,
    };
    this.reset = { ...initialState };
    this.expenseForm = this.expenseForm.bind(this);
    this.handleExpense = this.handleExpense.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.editForm = this.editForm.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
  }

  componentDidMount() {
    const { moneyInfo } = this.props;
    moneyInfo();
  }

  updateTotal() {
    const { expenses } = this.props;
    const totalMoney = expenses.length > 0 ? expenses.map((item) => {
      const moneyInfo = item.exchangeRates[item.currency];
      const thisValue = (Math.ceil(moneyInfo.ask * item.value * 100) / 100);
      return thisValue;
    }) : [0];
    const total = totalMoney.reduce((a, b) => a + b);
    this.setState({ total });
  }

  handleDropdown({ target }) {
    const { value, id } = target;
    this.setState({
      [id]: value,
    });
  }

  async handleExpense() {
    const { isEditing, editExpense, item } = this.props;
    if (!isEditing) {
      const exchangeRates = await moneyData();
      const { id, value, description, currency, tag, method } = this.state;
      const { saveExpense } = this.props;
      const newExpense = {
        id, value, description, currency, tag, method, exchangeRates,
      };
      saveExpense(newExpense);
      this.setState((state) => ({
        ...this.reset,
        id: state.id + 1,
      }));
    }
    if (isEditing) {
      const { id, value, description, currency, method, tag } = this.state;
      const newItem = { ...item, id, value, description, currency, method, tag };
      editExpense(newItem);
      this.setState({ ...this.reset });
    }
    this.updateTotal();
  }

  input(id, type, testid) {
    const { value } = this.state;
    return (<input
      id={ id }
      value={ value }
      type={ type }
      data-testid={ testid }
      // maxLength={ maxLength }
      onChange={ this.handleDropdown }
    />);
  }

  inputDois(id, type, testid) {
    const { state } = this;
    return (<input
      id={ id }
      value={ state[id] }
      type={ type }
      data-testid={ testid }
      // maxLength={ maxLength }
      onChange={ this.handleDropdown }
    />);
  }

  sendButton() {
    const { isEditing } = this.props;
    if (isEditing) {
      return (
        <button
          onClick={ this.handleExpense }
          type="reset"
        >
          Editar despesa
        </button>);
    }
    return <button onClick={ this.handleExpense } type="reset">Adicionar despesa</button>;
  }

  expenseForm(money) {
    const { currency: currencyState, tag: tagState, method: methodState } = this.state;
    return (
      <form>
        Valor:
        { this.input('value', 'number', 'value-input') }
        Moeda:
        <select
          id="currency"
          onChange={ this.handleDropdown }
          data-testid="currency-input"
          value={ currencyState }
        >
          {money.map((each) => (
            <option key={ each } data-testid={ each }>
              { each }
            </option>))}
        </select>
        Método de pagamento:
        <select
          value={ methodState }
          id="method"
          onChange={ this.handleDropdown }
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        Tag:
        <select
          value={ tagState }
          id="tag"
          onChange={ this.handleDropdown }
          data-testid="tag-input"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        Descrição:
        { this.inputDois('description', 'text', 'description-input') }
        { this.sendButton() }
      </form>);
  }

  editForm({ id, value, tag, method, currency, description }) {
    this.setState({ id, value, tag, method, currency, description });
  }

  render() {
    const { money, expenses } = this.props;
    const { email, isFetching } = this.props;
    const { total } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {`Email: ${email}`}
          </p>
          <p data-testid="total-field">
            {`Despesas totais: R$ ${total} `}
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        { !isFetching && this.expenseForm(money)}
        <main>
          <table>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            <WalletRegistry
              updateTotal={ this.updateTotal }
              expenses={ expenses }
              edit={ this.editForm }
              total={ total }
            />
          </table>
        </main>
      </div>);
  }
}

Wallet.propTypes = {
  saveExpense: PropTypes.func,
  moneyInfo: PropTypes.func,
  money: PropTypes.objectOf(PropTypes.object),
  isFetching: PropTypes.bool,
  email: PropTypes.string,
  item: PropTypes.shape({ id: PropTypes.number }),
  isEditing: PropTypes.bool,
  editExpense: PropTypes.func,
}.isRequired;

Wallet.defaultProps = {
  item: { id: 0 },
};

const mapStateToProps = (state) => ({
  money: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  isEditing: state.wallet.isEditing,
  item: state.wallet.item,
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (item) => dispatch(editedExpense(item)),
  saveExpense: (expense) => dispatch(walletUpdate(expense)),
  moneyInfo: () => dispatch(getMoneyInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
