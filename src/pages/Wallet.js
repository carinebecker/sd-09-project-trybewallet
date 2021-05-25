import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from '../services/api';
import { walletThunk, updateExpenseAction, currenciesAction } from '../actions';
import Select from '../components/Select';
import Table from '../components/Table';

class Wallet extends Component {
  constructor() {
    super();
    this.handleApi = this.handleApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.edit = this.edit.bind(this);
    this.total = this.total.bind(this);
    this.state = {
      expenses: {
        id: 0,
        value: 0,
        description: '',
        currency: 'default',
        method: 'default',
        tag: 'default',
        exchangeRates: {},
      },
      isEditing: false,
    };
  }

  componentDidMount() {
    this.handleApi();
  }

  componentDidUpdate() {
    const { expenseEdit } = this.props;
    const { isEditing } = this.state;
    if (expenseEdit !== undefined && isEditing === false) {
      this.edit();
    }
  }

  async handleApi() {
    const { saveCurrencies } = this.props;
    const result = await get();
    const keys = Object.keys(result);
    const coin = keys.filter((item) => item !== 'USDT');
    saveCurrencies(coin);
  }

  total() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach((e) => {
      const float = parseFloat(e.value);
      const ask = parseFloat(e.exchangeRates[e.currency].ask);
      sum += float * ask;
    });
    return sum.toFixed(2);
  }

  handleChange(target) {
    const { expenses } = this.state;
    this.setState({
      expenses: { ...expenses, [target.name]: target.value },
    });
  }

  edit() {
    const { expenseEdit } = this.props;

    this.setState({
      expenses: expenseEdit,
      isEditing: true,
    });
  }

  save() {
    const { saveExpenses } = this.props;
    const { expenses } = this.state;
    saveExpenses(expenses);
    this.setState((prevState) => ({
      expenses: { ...prevState.expenses, id: prevState.expenses.id + 1, value: 0 },
    }));
  }

  update() {
    const { updateExp } = this.props; // DispatchToProps
    const { expenses } = this.state;
    updateExp(expenses.id, expenses);
  }

  render() {
    const { email, currencies } = this.props; const sum = this.total();
    const { expenses: { value, description, currency, method, tag } } = this.state;
    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        <h3 data-testid="total-field">{sum}</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
        <input
          data-testid="value-input"
          type="number"
          name="value"
          id="value"
          value={ value }
          onChange={ (e) => this.handleChange(e.target) }
        />
        <input
          data-testid="description-input"
          placeholder="descrição"
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ (e) => this.handleChange(e.target) }
        />
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          value={ currency }
          onChange={ (e) => this.handleChange(e.target) }
        >
          <option disabled value="default"> -- Selecione uma opção -- </option>
          {currencies.map((e) => (
            <option key={ e } data-testid={ e } value={ e }>
              {e}
            </option>
          ))}
        </select>
        <Select handleChange={ this.handleChange } method={ method } tag={ tag } />
        <button type="button" onClick={ () => this.save() }>
          Adicionar despesa
        </button>
        <button type="button" onClick={ (e) => this.update(e.target.value) }>
          Editar despesa
        </button>
        <Table />
      </div>
    );
  }
}

// Acessar store como props - this.props
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  expenseEdit: state.wallet.expenseEdit,
  currencies: state.wallet.currencies,
});

// Dispachar actions
const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(walletThunk(expenses)),
  updateExp: (id, expense) => dispatch(updateExpenseAction(id, expense)),
  saveCurrencies: (currencies) => dispatch(currenciesAction(currencies)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  saveExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  expenseEdit: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateExp: PropTypes.func.isRequired,
  saveCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
