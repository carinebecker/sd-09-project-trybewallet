import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../services/api';
import { editExpenseList, saveExpenses } from '../actions/index';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      coins: [],
      loading: true,
    };
    this.mapCoins = this.mapCoins.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getExpenseDetailsToEdit = this.getExpenseDetailsToEdit.bind(this);
    this.changeButton = this.changeButton.bind(this);
    this.selectAndButtons = this.selectAndButtons.bind(this);
  }

  async componentDidMount() {
    const getcoins = await api();
    this.mapCoins(getcoins);
  }

  componentDidUpdate(prevProps) {
    const { expEdit } = this.props;
    if (expEdit !== prevProps.expEdit) {
      this.getExpenseDetailsToEdit();
    }
  }

  getExpenseDetailsToEdit() {
    const { expEdit } = this.props;
    const { value, description, currency, method, tag } = expEdit;
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  changeButton() {
    const { expEdit = {} } = this.props;
    let btnName = 'Adicionar despesa';
    if (Object.keys(expEdit).length) {
      btnName = 'Editar despesa';
    }
    return btnName;
  }

  handleInputs({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick(event) {
    event.persist();
    const response = await api();
    delete response.USDT;
    const { value, description, currency, method, tag, id } = this.state;
    const { dispatchExpense, expenses, expEdit, dispatchEditExpenseList } = this.props;
    if (event.target.name === 'Adicionar despesa') {
      dispatchExpense({
        id: id + 1,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: response,
      });
      this.setState({
        id: id + 1,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    } else {
      const newExpense = {
        id: expEdit.id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: expEdit.exchangeRates,
      };
      const saveEditExpenses = expenses.map((exp) => {
        if (exp.id === expEdit.id) {
          return newExpense;
        }
        return exp;
      });

      dispatchEditExpenseList(saveEditExpenses);
    }
  }

  mapCoins(coins) {
    delete coins.USDT;
    const arrayCoins = Object.keys(coins).map((key) => coins[key]);
    this.setState({
      coins: arrayCoins,
      loading: false,
    });
  }

  selectAndButtons() {
    return (
      <div>
        <select name="tag" data-testid="tag-input" onChange={ this.handleInputs }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }

  methodOptions() {
    return (
      <>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </>
    );
  }

  render() {
    const { coins, loading, value, description } = this.state;
    if (loading) return <h2>Loading..</h2>;
    return (
      <div>
        <input
          type="text"
          name="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleInputs }
        />
        <input
          value={ description }
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleInputs }
        />
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleInputs }
        >
          { coins.map((element, index) => (
            <option
              key={ index }
              data-testid={ element.code }
              value={ element.code }
            >
              {element.code}
            </option>
          ))}
        </select>
        <select name="method" data-testid="method-input" onChange={ this.handleInputs }>
          {this.methodOptions()}
        </select>
        {this.selectAndButtons()}
        <button
          type="submit"
          name={ this.changeButton() }
          onClick={ this.handleClick }
        >
          {this.changeButton()}
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatchExpense: PropTypes.func,
  dispatchEditExpenseList: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expEdit: state.wallet.expenseToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (data) => dispatch(saveExpenses(data)),
  dispatchEditExpenseList: (data) => dispatch(editExpenseList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
