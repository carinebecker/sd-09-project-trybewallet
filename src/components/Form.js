import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveExpensesThunk, saveExpenses, editExpense, enableBtn } from '../actions';
import getCoins from '../services/apiCoins';
import store from '../store/index';
import { initialStateHeader, response } from '../tests/mockData';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: response,
    };
    this.getCoin = this.getCoin.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.saveData = this.saveData.bind(this);
    this.renderEditBtn = this.renderEditBtn.bind(this);
  }

  componentDidMount() {
    this.getCoin();
  }

  async getCoin() {
    const data = await getCoins();
    this.setState({
      exchangeRates: data,
    });
  }

  saveData() {
    const { saveNewExpenses } = this.props;
    this.setState({
      id: store.getState().wallet.expenses.length + 1,
      value: 0,
    });
    saveNewExpenses(this.state);
  }

  handleInputs({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  renderOptions() {
    const { currencies } = initialStateHeader.wallet;
    return (
      currencies.filter((money) => money !== 'USDT').map((money) => (
        <option
          key={ money }
          data-testid={ money }
        >
          { money }
        </option>))
    );
  }

  renderEditBtn() {
    const { getKey, edit, activateBtn } = this.props;
    if (getKey === false) {
      return (<button type="button" onClick={ this.saveData }>Adicionar despesa</button>);
    } if (getKey === true) {
      return (
        <button
          type="button"
          onClick={ () => {
            edit(this.state);
            activateBtn(false);
          } }
        >
          Editar despesa
        </button>);
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <input
          type="number"
          value={ value }
          name="value"
          data-testid="value-input"
          placeholder="expense amount"
          onChange={ this.handleInputs }
        />
        <input
          type="text"
          name="description"
          data-testid="description-input"
          placeholder="description"
          onChange={ this.handleInputs }
        />
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleInputs }
        >
          { this.renderOptions() }
        </select>
        <select name="method" data-testid="method-input" onChange={ this.handleInputs }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select name="tag" data-testid="tag-input" onChange={ this.handleInputs }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        { this.renderEditBtn() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getKey: state.wallet.keyBtn,
  testestate: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveState: (state) => dispatch(saveExpenses(state)),
  saveNewExpenses: (state) => dispatch(saveExpensesThunk(state)),
  edit: (state) => dispatch(editExpense(state)),
  activateBtn: (bool, index) => dispatch(enableBtn(bool, index)),
});

Form.propTypes = {
  saveNewExpenses: PropTypes.func.isRequired,
  getKey: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
  activateBtn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
