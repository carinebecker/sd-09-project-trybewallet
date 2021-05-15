import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAwesomeAPI, addExpenses } from '../actions';
import ValueInput from './ValueInput';

class ExpenseForm extends React.Component {
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
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  valueChangeHandler({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async clickHandler() {
    const { fetchAPI, addExpense, currencies } = this.props;
    await fetchAPI();
    this.setState({ exchangeRates: currencies });
    addExpense(this.state);
    this.setState({ value: '', description: '' });
  }

  render() {
    const { description, value } = this.state;
    const { currencies } = this.props;
    const filteredCurrencies = Object.keys(currencies).filter((item) => item !== 'USDT');
    return (
      <form>
        <ValueInput valueChangeHandler={ this.valueChangeHandler } value={ value } />
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.valueChangeHandler }
        >
          {filteredCurrencies && filteredCurrencies.map((currency) => (
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
  fetchAPI: () => dispatch(fetchAwesomeAPI()),
  addExpense: (obj) => dispatch(addExpenses(obj)),
});

ExpenseForm.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.shape([]).isRequired,
  exchangeRates: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
