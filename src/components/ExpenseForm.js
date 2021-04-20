import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, submitExpense, updateExpenses } from '../actions';
import * as Api from '../services/Api';
import '../styles/components/ExpenseForm.css';

const INITIAL_STATE_INPUTS = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: INITIAL_STATE_INPUTS,
      paymentMethods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      expenseType: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getExpenseToEdit = this.getExpenseToEdit.bind(this);
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  componentDidUpdate(_, prevState) {
    const { inputs } = this.state;
    if (prevState.inputs === inputs) {
      this.getExpenseToEdit();
    }
  }

  getExpenseToEdit() {
    const { expenses, expenseIdToEdit, editor } = this.props;
    if (editor) {
      const expenseToEdit = expenses
        .find((expense) => expense.id === expenseIdToEdit);
      this.setState({
        inputs: {
          value: expenseToEdit.value,
          description: expenseToEdit.description,
          currency: expenseToEdit.currency,
          method: expenseToEdit.method,
          tag: expenseToEdit.tag,
        },
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      inputs: { ...prevState.inputs, [name]: value },
    }));
  }

  async handleClick(event) {
    event.preventDefault();
    const { inputs } = this.state;
    const {
      dispatchExpense,
      expenses,
      editor,
      expenseIdToEdit,
      dispatchUpdateExpenses,
    } = this.props;
    const exchangeRates = await Api.getExchangeRates();
    if (editor) {
      const oldExchangeRates = expenses
        .find((expense) => expense.id === expenseIdToEdit).exchangeRates;
      const updatedExpenses = expenses
        .map((expense) => {
          if (expense.id === expenseIdToEdit) {
            expense = ({
              id: expenseIdToEdit,
              ...inputs,
              exchangeRates: oldExchangeRates,
            });
          }
          return expense;
        });
      dispatchUpdateExpenses(updatedExpenses);
    } else {
      dispatchExpense({ id: expenses.length, ...inputs, exchangeRates });
    }
    this.setState({
      inputs: INITIAL_STATE_INPUTS,
    });
  }

  renderInput(type, name, value, label) {
    return (
      <div>
        <label htmlFor={ `expense-${name}` }>
          { `${label}:` }
          <input
            type={ type }
            id={ `expense-${name}` }
            name={ name }
            value={ value }
            data-testid={ `${name}-input` }
            onChange={ this.handleChange }
            min={ (type === 'number') ? 0 : undefined }
          />
        </label>
      </div>

    );
  }

  renderSelect(name, label, options, value) {
    return (
      <div>
        <label htmlFor={ `expense-${name}` }>
          { `${label}:` }
        </label>
        <select
          name={ name }
          data-testid={ `${name}-input` }
          value={ value }
          onChange={ this.handleChange }
        >
          { options.map((option) => (
            <option
              value={ option }
              key={ option }
              data-testid={ option }
            >
              { option }
            </option>)) }
        </select>
      </div>
    );
  }

  render() {
    const {
      inputs: { value, description, currency, method, tag },
      paymentMethods,
      expenseType,
    } = this.state;
    const { editor, currencies, isFetching } = this.props;
    return (
      <div
        className={ (editor) ? (
          'edit-expense-form-container'
        ) : (
          'expense-form-container'
        ) }
      >
        { !(isFetching) && (
          <form className="expense-form">
            { this.renderInput('number', 'value', value, 'Valor') }
            { this.renderSelect('currency', 'Moeda', currencies, currency) }
            { this.renderSelect('method', 'Método de Pagamento', paymentMethods, method) }
            { this.renderSelect('tag', 'Tag', expenseType, tag) }
            { this.renderInput('text', 'description', description, 'Descrição') }
            <div>
              { (editor) ? (
                <button
                  type="submit"
                  className="edit-btn"
                  onClick={ this.handleClick }
                >
                  Editar despesa
                </button>
              ) : (
                <button
                  type="submit"
                  className="add-btn"
                  onClick={ this.handleClick }
                >
                  Adicionar despesa
                </button>
              ) }
            </div>
          </form>
        ) }
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expenseIdToEdit: state.wallet.id,
  editor: state.wallet.editor,
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(submitExpense(expense)),
  dispatchUpdateExpenses: (expenses) => dispatch(updateExpenses(expenses)),
  dispatchCurrencies: () => dispatch(fetchCurrencies()),
});

ExpenseForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchExpense: PropTypes.func.isRequired,
  dispatchUpdateExpenses: PropTypes.func.isRequired,
  expenseIdToEdit: PropTypes.number,
  editor: PropTypes.bool,
  isFetching: PropTypes.bool,
  dispatchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ExpenseForm.defaultProps = {
  expenseIdToEdit: 0,
  editor: false,
  isFetching: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
