import React from 'react';
import { connect } from 'react-redux';
import getCurrencyOptions from '../services/getCurrencyOptions';
import { payMethods, tagExpense } from '../data';
import { walletCreate } from '../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
      loading: false,
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
      expenses: [],
    };

    this.renderValueInput = this.renderValueInput.bind(this);
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
    this.setState({ loading: true });
    getCurrencyOptions()
      .then((result) => {
        this.setState({ exchangeRates: result });
        return Object.keys(result);
      })
      .then((coins) => {
        this.setState({ coins });
        this.setState({ loading: false });
      });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    // fazer uma requisição à API para trazer o câmbio mais atualizado possível.
    // Buscar no redux o ultimo ID e acrescentar 1 ou mudar direto lá
    // salvar no redux sem sobrescrever
    const { wallet } = this.props;
    const { id, value, description, currency,
      method, tag, exchangeRates, expenses } = this.state;
    this.setState({
      expenses: [{
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      }],
    }, () => { wallet(expenses); });
  }

  renderValueInput() {
    return (
      <label htmlFor="value-input">
        Valor da despesa:
        <input
          data-testid="value-input"
          id="value-input"
          name="value"
          type="text"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInput() {
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          data-testid="description-input"
          id="description-input"
          name="descriptionIput"
          type="text"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { coins } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency-input"
          onChange={ this.handleChange }
          name="currency"
        >
          { coins
            .filter((coin) => coin !== 'USDT')
            .map((coin, index) => (
              <option
                data-testid={ coin }
                key={ index }
                value={ coin }
              >
                { coin }
              </option>)) }
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    return (
      <label htmlFor="method-input">
        Metodo de pagamento:
        <select
          data-testid="method-input"
          id="method-input"
          onChange={ this.handleChange }
          name="method"
        >
          { payMethods
            .map((method, index) => (
              <option
                key={ index }
                value={ method }
              >
                { method }
              </option>)) }
        </select>
      </label>
    );
  }

  renderTagExpense() {
    return (
      <label htmlFor="tag-input">
        Metodo de pagamento:
        <select
          data-testid="tag-input"
          id="tag-input"
          onChange={ this.handleChange }
          name="tag"
        >
          { tagExpense
            .map((tag, index) => (
              <option
                key={ index }
                value={ tag }
              >
                { tag }
              </option>)) }
        </select>
      </label>
    );
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <p>Carregando</p>;
    }
    return (
      <section>
        <h1>Formulario de adição de despesa</h1>
        <form>
          { this.renderValueInput() }
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

const mapDispatchToProps = (dispatch) => ({
  wallet: (expenses) => dispatch(walletCreate(expenses)),
});

export default connect(null, mapDispatchToProps)(ExpenseForm);
