import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createExpense,
  requisitionCoins,
} from '../actions/walletaction';

class ExpenseWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
      value: 0,
      description: '',
      method: 'Dinheiro',
      tag: 'Lazer',
      noEditing: true,
      idExpenseEdit: '',
    };

    this.handleExpense = this.handleExpense.bind(this);
    this.sentWallet = this.sentWallet.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidMount() {
    const { carryCurrencies } = this.props;
    carryCurrencies();
  }

  handleExpense({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  sentWallet(event) {
    event.preventDefault();
    const { renderNewExpense, edit } = this.props;
    const {
      currency,
      value,
      description,
      method,
      tag,
      noEditing,
      idExpenseEdit,
    } = this.state;
    if (noEditing) {
      renderNewExpense({ currency, method, value, description, tag });
    } else {
      edit({ idExpenseEdit, currency, method, value, description, tag });
    }
    this.setState({
      value: 0,
      description: '',
      noEditing: true,
    });
  }

  renderTable() {
    const { userExpenses } = this.props;
    const spaceHeader = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
    ];

    return (
      <table>
        <thead>
          <tr>
            {spaceHeader.map((space, index) => (
              <th key={ index }>{space}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userExpenses.map((expense, index) => (
            <tr key={ index }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>
                {expense.exchangeRates[expense.currency].name}
              </td>
              <td>
                {((expense.exchangeRates[expense.currency].ask * 100) / 100).toFixed(2)}
              </td>
              <td>
                {(expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderSelect() {
    const { tag, currency, method } = this.state;
    const { globalCurrencies } = this.props;
    return (
      <div>
        <span>Escolha a moeda:</span>
        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ ({ target }) => this.handleExpense(target) }
        >
          {globalCurrencies.map((currencyGlobal) => (
            <option
              key={ currencyGlobal }
              data-testid={ currencyGlobal }
              value={ currencyGlobal }
            >
              {currencyGlobal}
            </option>
          ))}
        </select>
        <span>Forma de pagamento:</span>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ ({ target }) => this.handleExpense(target) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <span>Categoria da despesa</span>
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ ({ target }) => this.handleExpense(target) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }

  render() {
    const { value, description } = this.state;
    const { email, userExpenses } = this.props;

    const sumExpenses = userExpenses.reduce(
      (acumulator, expense) => ((acumulator + Number(expense.value)
* expense.exchangeRates[expense.currency].ask)), 0,
    ).toFixed(2);

    return (
      <div>
        <header data-testid="email-field">
          <p>{ email }</p>
          <p data-testid="total-field">
            {`Despesa Total: ${sumExpenses}`}
          </p>
          <p data-testid="header-currency-field">
            Moeda padrão: BRL
          </p>
        </header>
        <form onSubmit={ this.sentWallet }>
          <input
            type="text"
            data-testid="value-input"
            name="value"
            placeholder="Valor da despesa"
            value={ value }
            onChange={ ({ target }) => this.handleExpense(target) }
          />
          <input
            type="text"
            data-testid="description-input"
            name="description"
            placeholder="Descrição da despesa"
            value={ description }
            onChange={ ({ target }) => this.handleExpense(target) }
          />
          {this.renderSelect()}
          <button type="submit">Adicionar Despesa</button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  globalCurrencies: state.wallet.currencies,
  userExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  renderNewExpense: (expensesUserInput) => dispatch(createExpense(expensesUserInput)),
  carryCurrencies: () => dispatch(requisitionCoins()),
});

ExpenseWallet.propTypes = {
  email: PropTypes.string.isRequerid,
}.isRequerid;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseWallet);
