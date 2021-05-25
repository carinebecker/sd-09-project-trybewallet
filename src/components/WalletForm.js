import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { statusToFalse, editComplete, deleteExpense, expenseAction } from '../actions';
import getCurrencies from '../fetch/getCurrencies';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);

    this.payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    this.defaultState = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.state = this.defaultState;

    this.handleChange = this.handleChange.bind(this);
    this.loadEditItem = this.loadEditItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    const { status } = this.props;
    if (status) {
      this.loadEditItem();
    }
  }

  loadEditItem() {
    const { item } = this.props;
    const { editingDispatch } = this.props;
    this.setState(() => (
      {
        value: item.value,
        currency: item.currency,
        method: item.method,
        tag: item.tag,
        description: item.description,
      }
    ), () => {
      editingDispatch();
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { addExpense } = this.props;
    const { expenses } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const nextId = expenses.length;
    const expense = { id: nextId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: { ...await getCurrencies() } };
    addExpense(expense);
    this.setState(() => (this.defaultState));
  }

  handleEditClick(item) {
    const { value, currency, method, tag, description } = this.state;
    const { editCompleted, expenses, deleteExpenseAction } = this.props;
    const findItem = expenses.find(({ id }) => id === item.id);
    findItem.value = value;
    findItem.currency = currency;
    findItem.method = method;
    findItem.tag = tag;
    findItem.description = description;
    deleteExpenseAction(expenses);
    editCompleted();
    this.setState(() => (this.defaultState));
  }

  renderExpenseInput() {
    const { value } = this.state;
    return (
      <label htmlFor="select-currency">
        Adicione despesa:
        <input
          type="number"
          name="value"
          placeholder="Quanto você gastou?"
          data-testid="value-input"
          id="select-currency"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { currency } = this.state;
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Escolha a moeda de sua despesa:
        <select
          value={ currency }
          name="currency"
          id="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          { currencies.map((currencyCode) => (
            <option
              data-testid={ currencyCode }
              key={ currencyCode }
              value={ currencyCode }
            >
              { currencyCode }
            </option>))}
        </select>
      </label>
    );
  }

  renderMethodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method-payment">
        Forma de Pagamento:
        <select
          value={ method }
          onChange={ this.handleChange }
          name="method"
          data-testid="method-input"
          id="method-payment"
        >
          {this.payments.map((methodPay) => (
            <option key={ methodPay } value={ methodPay }>{ methodPay }</option>
          ))}
        </select>
      </label>
    );
  }

  renderTagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="kindOfExpense">
        Tipo de despesa:
        <select
          value={ tag }
          onChange={ this.handleChange }
          name="tag"
          data-testid="tag-input"
          id="kindOfExpense"
        >
          {this.tags.map((param) => (
            <option key={ param } value={ param }>{ param }</option>
          ))}
        </select>
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="descricao-despesa">
        Descreva sua despesa:
        <textarea
          placeholder="Você gastou com o quê?"
          name="description"
          data-testid="description-input"
          id="descricao-despesa"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderAddBtn() {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
      >
        Adicionar despesa
      </button>
    );
  }

  renderEditBtn(item) {
    return (
      <button
        type="button"
        onClick={ () => this.handleEditClick(item) }
      >
        Editar despesa
      </button>
    );
  }

  render() {
    const { btnStatus, item } = this.props;
    return (
      <form>
        {this.renderExpenseInput()}
        {this.renderDescriptionInput()}
        {this.renderCurrencyInput()}
        {this.renderMethodInput()}
        {this.renderTagInput()}
        { btnStatus ? this.renderEditBtn(item) : this.renderAddBtn() }
      </form>
    );
  }
}

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  btnStatus: PropTypes.objectOf(PropTypes.bool).isRequired,
  editingDispatch: PropTypes.func.isRequired,
  editCompleted: PropTypes.func.isRequired,
  deleteExpenseAction: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (param) => dispatch(expenseAction(param)),
  editingDispatch: () => dispatch(statusToFalse()),
  deleteExpenseAction: (obj) => dispatch(deleteExpense(obj)),
  editCompleted: () => dispatch(editComplete()),
});

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  btnStatus: wallet.btnStatus,
  item: wallet.item,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
