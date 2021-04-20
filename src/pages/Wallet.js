import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ExpenseList from './WalletRegistry';
import { editedExpense, getMoneyInfo, walletUpdate } from '../actions/index';
import WalletRegistry from './WalletRegistry';
import './Wallet.css';

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
    };
    this.reset = { ...this.state };
    this.expenseForm = this.expenseForm.bind(this);
    this.handleExpense = this.handleExpense.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.editForm = this.editForm.bind(this);
  }

  componentDidMount() {
    const { moneyInfo } = this.props;
    moneyInfo();
  }

  handleDropdown({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleExpense() {
    const { moneyInfo } = this.props;
    moneyInfo();
    const { money, saveExpense } = this.props;
    const newExpense = {
      ...this.state,
      exchangeRates: money,
    };
    saveExpense(newExpense);
    // const { expenses } = this.props;
    // const totalMoney = expenses.forEach((ex) => {
    //   console.log(ex);
    //   const { exchangeRates, currency, value } = ex;
    //   const { ask } = exchangeRates.find((e) => e.code === currency);
    //   return (Math.floor(ask * value * 100) / 100);
    // });
    // console.log(totalMoney);
    // const total = totalMoney.reduce((a, b) => a + b);
    this.setState({
      value: 0,
    });
    this.setState((state) => ({
      // ...this.reset,
      // value: 0,
      id: state.id + 1,
    }));
  }

  input(id, type, testid) {
    const { value } = this.state;
    console.log('input', value);
    return (<input
      name={ id }
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
      name={ id }
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
      const { id, value, description, currency, method, tag } = this.state;
      const { item, editExpense } = this.props;
      const newItem = { ...item, id, value, description, currency, method, tag };
      return (
        <button
          onClick={ () => {
            editExpense(newItem);
            this.setState(() => ({
              ...this.reset,
            }));
          } }
          type="reset"
        >
          Editar despesa
        </button>);
    }
    return <button onClick={ this.handleExpense } type="reset">Adicionar Despesa</button>;
  }

  expenseForm(money) {
    const { currency: currencyState, tag: tagState, method: methodState } = this.state;
    return (
      <form>
        Valor:
        { this.input('value', 'number', 'value-input', '999999999999') }
        Moeda:
        <select
          id="currency"
          onChange={ this.handleDropdown }
          data-testid="currency-input"
          value={ currencyState }
        >
          {money.map((each) => (
            <option key={ each.code } data-testid={ each.code }>
              { each.code }
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
        { this.inputDois('description', 'text', 'description-input', '50') }
        { this.sendButton() }
      </form>);
  }

  editForm({ id, value, tag, method, currency, description }) {
    this.setState({ id, value, tag, method, currency, description });
  }

  render() {
    const { money } = this.props;
    const keys = Object.keys(money);
    const allKeys = keys.filter((coin) => coin !== 'USDT');
    const allMoney = allKeys.map((key) => money[key]);
    const { email, isFetching } = this.props;
    const { value } = this.state;
    console.log(value);
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {`Email: ${email}`}
          </p>
          <p data-testid="total-field">
            {`Despesas totais: R$ ${0} `}
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        { isFetching ? <p>Loading...</p> : this.expenseForm(allMoney)}
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
            <WalletRegistry edit={ this.editForm } />
          </table>
        </main>
      </div>
    );
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
  // expenses: PropTypes.arrayOf(PropTypes.object),
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
