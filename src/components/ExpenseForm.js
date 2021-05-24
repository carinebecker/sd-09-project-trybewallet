import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPIcurrencies, addExpenses } from '../actions';
import InputExpenses from './InputExpenses';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };

    this.valueChangeHandler = this.valueChangeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  valueChangeHandler({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async clickHandler() {
    const { fetch, addExpense, currencies } = this.props;
    await fetch();
    this.setState({ exchangeRates: currencies });
    addExpense(this.state);
    this.setState({ value: '', description: '' });
  }

  render() {
    const { description, value } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <InputExpenses valueChangeHandler={ this.valueChangeHandler } value={ value } />
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.valueChangeHandler }
        >
          {Object.keys(currencies).map((currency) => (
            <option data-testid={ currency } key={ currency } value={ currency }>
              { currency }
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.valueChangeHandler }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.valueChangeHandler }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <input
          data-testid="description-input"
          name="description"
          value={ description }
          placeholder="Descrição da despesa"
          onChange={ this.valueChangeHandler }
        />
        <button type="button" onClick={ this.clickHandler }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchAPIcurrencies()),
  addExpense: (obj) => dispatch(addExpenses(obj)),
});

ExpenseForm.propTypes = {
  fetch: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.shape([]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
