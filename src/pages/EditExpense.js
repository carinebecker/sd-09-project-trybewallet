import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from './Select';
import { finishEdit } from '../actions';

const paymentOptions = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];
const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    const { expenseToEdit } = this.props;
    this.state = {
      ...expenseToEdit,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
  }

  // Atualiza o estado
  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  // Manda os dados atualizados para o estado.
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

  // Renderiza o dropdown da moeda. Não consegui usar o componente Select. Ver melhor depois
  renderCurrency() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
          id="currency-input"
        >
          {
            currencies.map((option) => ((option !== 'USDT') ? (
              <option key={ option } data-testid={ option }>
                {option}
              </option>
            ) : ''))
          }
        </select>
      </label>
    );
  }

  render() {
    return (
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
        { this.renderCurrency() }
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
        <div>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Editar despesa
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  sendEditExpense: (expense) => dispatch(finishEdit(expense)),
});

EditExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  sendEditExpense: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
};

EditExpense.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
