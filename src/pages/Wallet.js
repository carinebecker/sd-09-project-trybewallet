import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPrice, saveExpense } from '../actions';

const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagInput1 = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const currencyInput = 'currency-input';
const methodInput = 'method-input';
const tagInput = 'tag-input';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { fetchPriceKey } = this.props;
    fetchPriceKey();
  }

  handleChange({ target: { name, value } }) {
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    await fetchPrice();
    const { saveExpenseKey, currencies } = this.props;
    await this.setState({
      exchangeRates: currencies,
    });
    saveExpenseKey(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  }

  dropDown(c, dataTestId) {
    return (
      <select
        data-testid={ dataTestId }
        onChange={ this.handleChange }
      >
        {c.map((info, counter) => (
          <option
            data-testid={ info }
            key={ counter }
          >
            { info }
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { email, currencies } = this.props;
    const currencyKey = Object.keys(currencies);
    const { value, description } = this.state;
    console.log(currencies);
    if (currencies) {
      console.log(currencies);
      return (
        <div>
          <header>
            <p data-testid="email-field">{email}</p>
            <p data-testid="total-field">{value}</p>
            <p data-testid="header-currency-field">BRL</p>
          </header>
          <form>
            <input
              data-testid="value-input"
              type="number"
              name="value"
              onChange={ this.handleChange }
              value={ value }
            />
            <input
              data-testid="description-input"
              type="text"
              name="description"
              onChange={ this.handleChange }
              value={ description }
            />
            {this.dropDown(currencyKey, currencyInput)}
            {this.dropDown(paymentMethod, methodInput)}
            {this.dropDown(tagInput1, tagInput)}
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </form>
        </div>
      );
    }
    return <p>Loading...</p>;
  }
}

const mapStateToProps = (props) => {
  return ({
    email: props.user.email,
    currencies: props.wallet.currencies,
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchPriceKey: () => dispatch(fetchPrice()),
  saveExpenseKey: (obj) => dispatch(saveExpense(obj)),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
