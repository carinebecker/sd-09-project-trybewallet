import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editing, fetchCurrencies, updateExpenses } from '../../actions/walletActions';
import '../ExpenseForm/style.css';
import Value from '../Value';
import Description from '../Description';
import Currency from '../Currency';
import Method from '../Method';
import Tag from '../Tag';

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.setFields = this.setFields.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
    this.setFields();
  }

  async getCurrencies() {
    const { fetchCurrenciesAPI } = this.props;
    await fetchCurrenciesAPI();
  }

  setFields() {
    const { expenseId, expenses } = this.props;
    const expense = expenses.find((element) => element.id === expenseId);
    this.setState({
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  resetFields() {
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  saveExpense() {
    const { expenseId, currencies, editingExpense, expenses, updateExpense } = this.props;
    this.getCurrencies();
    const { value, description, currency, method, tag } = this.state;
    const updatedExpense = {
      id: expenseId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    expenses[expenseId] = updatedExpense;
    this.resetFields();
    editingExpense(false);
    updateExpense(expenses);
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, disable } = this.state;
    const currenciesCode = Object.keys(currencies);
    return (
      <form className="expense-form">
        <div>
          <Value fieldContent={ value } onChange={ this.handleChange } />
          <Description fieldContent={ description } onChange={ this.handleChange } />
          <Currency
            currencies={ currenciesCode }
            onChange={ this.handleChange }
            fieldContent={ currency }
          />
          <Method fieldContent={ method } onChange={ this.handleChange } />
          <Tag fieldContent={ tag } onChange={ this.handleChange } />
        </div>
        <button
          type="button"
          className="expense-form-button"
          disabled={ disable }
          onClick={ this.saveExpense }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToPops = (state) => ({
  currencies: state.wallet.currencies,
  expenseId: state.wallet.expenseId,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesAPI: () => dispatch(fetchCurrencies()),
  editingExpense: (bool) => dispatch(editing(bool)),
  updateExpense: (expenses) => dispatch(updateExpenses(expenses)),
});

EditForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  editingExpense: PropTypes.func.isRequired,
  expenseId: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrenciesAPI: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToPops, mapDispatchToProps)(EditForm);
