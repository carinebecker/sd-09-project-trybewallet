import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from '../services/api';
import { walletThunk } from '../actions';
import Select from '../components/Select';
import Table from '../components/Table';

class Wallet extends Component {
  constructor() {
    super();
    this.handleApi = this.handleApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.total = this.total.bind(this);
    this.state = {
      currencies: [],
      expenses: {
        id: 0,
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    };
  }

  componentDidMount() {
    this.handleApi();
  }

  async handleApi() {
    const result = await get();
    const keys = Object.keys(result);
    const coin = keys.filter((item) => item !== 'USDT');
    this.setState({ currencies: coin });
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

  save() {
    const { saveExpenses } = this.props;
    const { expenses } = this.state;
    saveExpenses(expenses);
    this.setState((prevState) => ({
      expenses: { ...prevState.expenses, id: prevState.expenses.id + 1, value: 0 },
    }));
  }

  render() {
    const { email } = this.props;
    const sum = this.total();
    const { currencies, expenses: { value, description } } = this.state;
    return (
      <div>
        <h2>Wallet Page</h2>
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
          defaultValue="default"
          onChange={ (e) => this.handleChange(e.target) }
        >
          <option disabled value="default"> -- Selecione uma opção -- </option>
          {currencies.map((e) => (
            <option key={ e } data-testid={ e } value={ e }>
              {e}
            </option>
          ))}
        </select>
        <Select handleChange={ this.handleChange } />
        <button type="button" onClick={ () => this.save() }>
          Adicionar despesa
        </button>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(walletThunk(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  saveExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
