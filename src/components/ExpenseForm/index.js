import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchCurrencies } from '../../actions/walletActions';
import './style.css';
import Value from '../Value';
import Description from '../Description';
import Currency from '../Currency';
import Method from '../Method';
import Tag from '../Tag';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      disable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const { fetchCurrenciesAPI } = this.props;
    await fetchCurrenciesAPI();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
    this.validateFields();
  }

  resetFields() {
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      disable: true,
    });
  }

  validateFields() {
    const { value, description, currency, method, tag } = this.state;
    if (value > 0
      && description !== ''
      && currency !== ''
      && method !== ''
      && tag !== '') {
      this.setState({ disable: false });
    }
  }

  saveExpense() {
    const { currencies, sendExpense, expenses } = this.props;
    this.getCurrencies();
    const { value, description, currency, method, tag } = this.state;
    const newExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    sendExpense(newExpense);
    this.resetFields();
  }

  render() {
    const { currencies } = this.props;
    const currenciesCode = Object.keys(currencies).filter((item) => item !== 'USDT');
    const { value, description, currency, method, tag, disable } = this.state;
    return (
      <form className="expense-form">
        <div>
          <Value fieldContent={ value } onChange={ this.handleChange } />
          <Description fieldContent={ description } onChange={ this.handleChange } />
          <Currency
            currencies={ currenciesCode }
            onChange={ this.handleChange }
            fieldContent={ currency }
          />
          <Method fieldContent={ method } onChange={ this.handleChange } />
          <Tag fieldContent={ tag } onChange={ this.handleChange } />
        </div>
        <button
          type="button"
          onClick={ this.saveExpense }
          disabled={ disable }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToPops = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesAPI: () => dispatch(fetchCurrencies()),
  sendExpense: (expenses) => dispatch(addExpense(expenses)),
});

ExpenseForm.propTypes = {
  fetchCurrenciesAPI: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToPops, mapDispatchToProps)(ExpenseForm);
