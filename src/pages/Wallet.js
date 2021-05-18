import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPrice, saveExpense } from '../actions';

const Alimentacao = 'Alimentação';

const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagInput1 = [Alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const currencyInput = 'currency';
const methodInput = 'method';
const tagInput = 'tag';

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
      tag: Alimentacao,
    };
  }

  componentDidMount() {
    const { fetchPriceKey } = this.props;
    fetchPriceKey();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { saveExpenseKey, fetchPriceKey } = this.props;
    fetchPriceKey();
    saveExpenseKey(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
    }));
  }

  dropDown(c, name) {
    return (
      <select
        data-testid={ `${name}-input` }
        onChange={ this.handleChange }
        name={ name }
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
    const { value, description } = this.state;
    if (currencies) {
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
            {this.dropDown(currencies, currencyInput)}
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
  console.log('');
  return ({
    email: props.user.email,
    currencies: props.wallet.currencies,
    data: props.wallet.data,
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
