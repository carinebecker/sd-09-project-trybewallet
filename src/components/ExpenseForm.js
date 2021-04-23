import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { payMethods, tagExpense } from '../data';
import { fetchCurrencies, walletCreate } from '../actions';
import ValueInput from './ExpenseForm/ValueInput';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };

    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.getCurrencyOptions = this.getCurrencyOptions.bind(this);
    this.renderPaymentMethod = this.renderPaymentMethod.bind(this);
    this.renderTagExpense = this.renderTagExpense.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getCurrencyOptions();
  }

  getCurrencyOptions() {
    const { getExchangeRates } = this.props;
    this.setState({ loading: true });
    getExchangeRates()
      .then(() => { this.setState({ loading: false }); });
  }

  handleChange({ target }) {
    console.log(target);
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { value, description, currency,
      method, tag } = this.state;
    const { getExchangeRates, wallet, expenses } = this.props;
    getExchangeRates()
      .then((result) => (
        wallet(
          {
            id: expenses.length,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates: result.currencies,
          },
        )
      ))
      .then(() => {
        this.setState({
          value: '',
          description: '',
          currency: 'USD',
          method: '',
          tag: '',
        });
      });
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          data-testid="description-input"
          id="description-input"
          name="description"
          type="text"
          onChange={ this.handleChange }
          value={ description }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { currency } = this.state;
    const { isFetching, currencies } = this.props;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency-input"
          onChange={ this.handleChange }
          name="currency"
          value={ currency }
        >
          { !isFetching
          && Object.keys(currencies)
            .filter((coin) => coin !== 'USDT')
            .map((coin, index) => (
              <option
                data-testid={ coin }
                key={ index }
              >
                { coin }
              </option>)) }
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Metodo de pagamento:
        <select
          data-testid="method-input"
          id="method-input"
          onChange={ this.handleChange }
          name="method"
          value={ method }
        >
          { payMethods
            .map((payMethod, index) => (
              <option
                key={ index }
              >
                { payMethod }
              </option>)) }
        </select>
      </label>
    );
  }

  renderTagExpense() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Categoria:
        <select
          data-testid="tag-input"
          id="tag-input"
          onChange={ this.handleChange }
          name="tag"
          value={ tag }
        >
          { tagExpense
            .map((tagExp, index) => (
              <option
                key={ index }
              >
                { tagExp }
              </option>)) }
        </select>
      </label>
    );
  }

  render() {
    const { loading, value } = this.state;
    if (loading) {
      return <p>Carregando</p>;
    }
    return (
      <section>
        <form>
          <ValueInput value={ value } handleChange={ this.handleChange } />
          { this.renderDescriptionInput() }
          { this.renderCurrencyInput() }
          { this.renderPaymentMethod() }
          { this.renderTagExpense() }
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, isFetching, expenses } }) => ({
  currencies,
  isFetching,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  wallet: (expenses) => dispatch(walletCreate(expenses)),
  getExchangeRates: () => dispatch(fetchCurrencies()),
});

ExpenseForm.propTypes = {
  getExchangeRates: PropTypes.func.isRequired,
  wallet: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
