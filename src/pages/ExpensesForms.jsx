import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseThunk } from '../actions';
import Moedas from '../services/requireApi';
import '../styles/expensesForms.css';

class ExpensesForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dispesaAtual: {
        id: 0,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.insertData();
  }

  async fetchMoedas() {
    const data = await Moedas();
    return data;
  }

  async insertData() {
    const moedas = await this.fetchMoedas();
    const moedasNome = Object.keys(moedas);
    this.setState({
      data: moedasNome,
    });
  }

  handleChange({ target: { name, value } }) {
    const { dispesaAtual } = this.state;
    this.setState({
      dispesaAtual: {
        ...dispesaAtual,
        [name]: value,
      },
    });
  }

  inputsWithLabel(dispesaAtual) {
    return (
      <>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            value={ dispesaAtual.value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            value={ dispesaAtual.description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }

  selectMoedas(data, dispesaAtual) {
    return (
      <select
        name="currency"
        id="currency"
        data-testid="currency-input"
        value={ dispesaAtual.currency }
        onChange={ this.handleChange }
      >
        {data.map((item) => (
          <option data-testid={ item } key={ item }>{ item }</option>
        ))}
      </select>
    );
  }

  selectTag(dispesaAtual) {
    return (
      <select
        name="tag"
        id="tag"
        data-testid="tag-input"
        value={ dispesaAtual.tag }
        onChange={ this.handleChange }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  paymenteSelect(dispesaAtual) {
    return (
      <select
        name="method"
        value={ dispesaAtual.method }
        data-testid="method-input"
        onChange={ this.handleChange }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  handleClick(dispesaAtual, addExpense) {
    return (
      addExpense(dispesaAtual),
      this.setState((previouState) => ({
        dispesaAtual: {
          id: previouState.dispesaAtual.id + 1,
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          value: 0,
          description: '',
        },
      }))
    );
  }

  render() {
    const { data, dispesaAtual } = this.state;
    const { addExpense } = this.props;
    return (
      <div className="main-content-forms">
        <form action="" className="forms">
          { this.inputsWithLabel(dispesaAtual) }
          <div>
            { this.selectMoedas(data, dispesaAtual) }
            { this.selectTag(dispesaAtual) }
            { this.paymenteSelect(dispesaAtual) }
          </div>
          <button
            type="button"
            onClick={ () => this.handleClick(dispesaAtual, addExpense) }
          >
            <strong>Adicionar despesa</strong>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  currency: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (dispesaAtual) => dispatch(addExpenseThunk(dispesaAtual)),
});

ExpensesForms.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForms);
