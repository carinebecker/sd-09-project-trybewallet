import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencyData as fetchCurrencyDataAction,
} from '../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      count: 0,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { value, description, currency, method, tag, count } = this.state;
    const { fetchCurrencyData } = this.props;

    const expenseData = {
      value: value,
      description: description,
      currency: currency,
      method: method,
      tag: tag,
      id: count,
      exchangeRates: '',
    };

    fetchCurrencyData(expenseData);

    this.setState((state) => ({
      count: state.count += 1,
    }));

    this.resetState();
  }

  resetState() {
    this.setState((state) => ({
      ...state,
      value: '',
      description: '',
    }));
  }

  renderForm() {
    const { handleClick, handleChange, renderForm } = this;
    const { value, description, currency, method, tag } = this.state;
    const { currencies, isEdit } = this.props;
    return (
      <form>
          <h2>Dados da despesa:</h2>
          <input
            data-testid="value-input"
            type="number"
            placeholder="Valor"
            name="value"
            value={ value }
            onChange={ (event) => handleChange(event) }
          />
          <input
            data-testid="description-input"
            type="text"
            placeholder="Descrição"
            name="description"
            value={ description }
            onChange={ (event) => handleChange(event) }
          />
          <label htmlFor="currency">
            Moeda escolhida
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ (event) => handleChange(event) }
            >
              {
                currencies
                  .map((element) => (
                    <option
                      value={ element }
                      data-testid={ element }
                      key={ element }
                    >
                      { element }
                    </option>
                  ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento utilizado
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              onChange={ (event) => handleChange(event) }
            >
              {
                ['Dinheiro', 'Cartão de crédito', 'Cartão de débito']
                  .map((element) => (
                    <option
                      value={ element }
                      key={ element }
                    >
                      { element }
                    </option>
                  ))
              }
            </select>
          </label>
          <label htmlFor="tag">
            Selecione uma categoria
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={ tag }
              onChange={ (event) => handleChange(event) }
            >
              {
                ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
                  .map((e) => (
                    <option
                      value={ e }
                      key={ e }
                    >
                      { e }
                    </option>
                  ))
              }
            </select>
          </label>
          <button
            type="button"
            onClick={ () => handleClick() }
          >
            Adicionar despesa
          </button>
        </form>
    );
  }

  render() {
    const { handleClick, handleChange, renderForm } = this;
    const { value, description, currency, method, tag } = this.state;
    const { currencies, isEdit } = this.props;

    return (
      <>
        {
          !(isEdit) ? renderForm() : <span>Editando</span>
        }
      </>
    );
  }
}

ExpenseForm.propTypes = {
  savesCurrencyList: PropTypes.func.isRequired,
  expenses: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchCurrencyData: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEdit: state.wallet.isEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyData: (currencyData) => dispatch(fetchCurrencyDataAction(currencyData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
