import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchAPI from '../services/api';
import { saveFormsThunk } from '../actions';
import store from '../store/index';

class Forms extends Component {
  constructor() {
    super();
    this.handleAPI = this.handleAPI.bind(this);
    this.createCoinOptions = this.createCoinOptions.bind(this);
    this.handleMethodOption = this.handleMethodOption.bind(this);
    this.handleTagOption = this.handleTagOption.bind(this);
    this.saveInputs = this.saveInputs.bind(this);
    this.handleCurrencyOption = this.handleCurrencyOption.bind(this);
    this.saveAndDispatch = this.saveAndDispatch.bind(this);
    this.state = {
      exchangeRates: [],
      method: '',
      tag: '',
      value: 0,
      description: '',
      currency: '',
      id: 0,
    };
  }

  componentDidMount() {
    this.handleAPI();
  }

  async handleAPI() {
    const response = await fetchAPI();
    this.setState({
      exchangeRates: response,
    });
  }

  createCoinOptions() {
    const { exchangeRates } = this.state;
    delete exchangeRates.USDT;
    const arrayOfCoins = Object.keys(exchangeRates);
    return arrayOfCoins.map((coin) => (
      <option data-testid={ coin } key={ coin }>{ coin }</option>
    ));
  }

  handleMethodOption({ target }) {
    this.setState({
      method: target.value,
    });
  }

  handleTagOption({ target }) {
    this.setState({
      tag: target.value,
    });
  }

  handleCurrencyOption({ target }) {
    this.setState({
      currency: target.value,
    });
  }

  saveInputs({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  saveAndDispatch() {
    const { dispatchExpenses } = this.props;
    this.setState({
      id: store.getState().wallet.expenses.length + 1,
      value: 0,
    });
    dispatchExpenses(this.state);
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <input
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.saveInputs }
        />
        <input
          data-testid="description-input"
          name="description"
          onChange={ this.saveInputs }
        />
        <select data-testid="currency-input" onChange={ this.handleCurrencyOption }>
          { this.createCoinOptions() }
        </select>
        <select data-testid="method-input" onClick={ this.handleMethodOption }>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input" onClick={ this.handleTagOption }>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button type="button" onClick={ this.saveAndDispatch }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (expenses) => dispatch(saveFormsThunk(expenses)),
});

export default connect(null, mapDispatchToProps)(Forms);

Forms.propTypes = {
  dispatchExpenses: PropTypes.func.isRequired,
};
