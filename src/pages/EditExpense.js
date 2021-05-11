import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from './Select';
import { finishEdit } from '../actions';

const paymentOptions = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];
const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const INITIAL_STATE = {
  id: 0,
  value: 0.00,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: tagOptions[0],
};

class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    const { expenseEdit } = this.props;
    this.state = {
      ...expenseEdit,
    };
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Atualiza estado dos inputs
  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // Atualiza os estados de acordo com o click no botão,.
  // faz a conversão dos valores e envia pro header.
  handleClick() {
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const { sendEditExpense } = this.props;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    sendEditExpense(expense);
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form id="add-expense-form">
          <input
            data-testid="value-input"
            name="value"
            type="text"
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
          />
          <Select
            textLabel="Moedas:"
            name="currency"
            onChange={ this.handleChange }
            options={ currencies }
          />
          <Select
            textLabel="Método de Pagamento:"
            name="method"
            onChange={ this.handleChange }
            options={ paymentOptions }
          />
          <Select
            textLabel="Categoria da Despesa:"
            name="tag"
            onChange={ this.handleChange }
            options={ tagOptions }
          />
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Editar despesa
          </button>

        </form>
      </div>

    );
  }
}

EditExpense.propTypes = {
  sendEditExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(),
}.isRequired;
// MapState - leitura do estado via props

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseToEdit: state.wallet.expenseToEdit,
});

// Manda tudo pra store
const mapDispatchToProps = (dispatch) => ({
  sendEditExpense: (expense) => dispatch(finishEdit(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
