import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import { fetchCurrencies, loginUser, walletCreate } from '../../actions';
import Select from './Select';
import Button from './Button';

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

    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.getCurrencyOptions = this.getCurrencyOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.elementsEdit = this.elementsEdit.bind(this);
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

  elementsEdit(expenseEdit) {
    this.setState({
      value: expenseEdit.value,
      description: expenseEdit.description,
      currency: expenseEdit.currency,
      method: expenseEdit.method,
      tag: expenseEdit.tag,
    });
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

  render() {
    const { loading, value, description, method, tag } = this.state;
    if (loading) {
      return <p>Carregando</p>;
    }
    return (
      <section>
        <form>
          <Input
            name="value"
            value={ value }
            handleChange={ this.handleChange }
            label="Valor da despesa: "
          />
          <Input
            name="description"
            value={ description }
            handleChange={ this.handleChange }
            label="Descrição: "
          />

          { this.renderCurrencyInput() }

          <Select
            name="method"
            value={ method }
            handleChange={ this.handleChange }
            label="Metodo de pagamento: "
          />
          <Select
            name="tag"
            value={ tag }
            handleChange={ this.handleChange }
            label="Categoria: "
          />
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa !!
          </button>
          <Button elementsEdit={ this.elementsEdit } />
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
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
