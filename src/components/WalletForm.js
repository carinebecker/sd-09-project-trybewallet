import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../services/api';
import { saveTotalPrice, saveExpenses } from '../actions/index';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      coins: [],
      loading: true,
    };
    this.mapCoins = this.mapCoins.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.addNewExpense = this.addNewExpense.bind(this);
  }

  async componentDidMount() {
    const getcoins = await api();
    this.mapCoins(getcoins);
  }

  handleInputs({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async addNewExpense() {
    const response = await api();
    const { value, description, currency, method, tag, id } = this.state;
    const { dispatchTotal, total, dispatchExpense } = this.props;

    const newTotal = Number(total) + (Number(value) * response[currency].ask);

    if (value < 1 || description === '') {
      return;
    }
    dispatchTotal(newTotal);
    dispatchExpense({
      id: id + 1,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: response,
    });

    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  mapCoins(coins) {
    delete coins.USDT;
    const arrayCoins = Object.keys(coins).map((key) => coins[key]);
    this.setState({
      coins: arrayCoins,
      loading: false,
    });
  }

  render() {
    const { coins, loading, value, description } = this.state;
    if (loading) return <h2>Loading..</h2>;
    return (
      <div>
        <input
          type="text"
          name="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleInputs }
        />
        <input
          value={ description }
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleInputs }
        />
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleInputs }
        >
          { coins.map((element, index) => (
            <option
              key={ index }
              data-testid={ element.code }
              value={ element.code }
            >
              {element.code}
            </option>
          ))}
        </select>
        <select name="method" data-testid="method-input" onChange={ this.handleInputs }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select name="tag" data-testid="tag-input" onChange={ this.handleInputs }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="submit" onClick={ this.addNewExpense }>Adicionar despesa</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  total: PropTypes.number,
  dispatchTotal: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  total: wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTotal: (newTotal) => dispatch(saveTotalPrice(newTotal)),
  dispatchExpense: (data) => dispatch(saveExpenses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
