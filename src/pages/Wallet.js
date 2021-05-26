import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletHeader from '../components/WalletHeader';
import WalletForm from '../components/WalletForm';
import {
  saveExpensesInfo, eraseExpensesInfo, updateExpenseInfo, saveCurrencies,
} from '../actions/expensesAction';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.apiFetch = this.apiFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitRedux = this.submitRedux.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.changeExpense = this.changeExpense.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
      totalValue: 0,
      idEdit: 0,
      changeTF: false,
    };
  }

  componentDidMount() {
    this.apiFetch();
  }

  async apiFetch() {
    const { saveCurrency } = this.props;
    const fetchCurrencyApi = await fetch('https://economia.awesomeapi.com.br/json/all').then((response) => response.json());
    delete fetchCurrencyApi.USDT;
    this.setState({
      exchangeRates: fetchCurrencyApi,
    });
    saveCurrency(Object.keys(fetchCurrencyApi));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleValue(value) {
    this.setState((previousValue) => ({
      totalValue: previousValue.totalValue + value }));
  }

  submitRedux() {
    const { saveExpenses } = this.props;
    this.apiFetch();
    const { id, value, description,
      currency, method, tag, exchangeRates } = this.state;
    if (exchangeRates) {
      this.handleValue(Number(value) * parseFloat(exchangeRates[currency].ask));
      this.setState((currentValue) => ({ id: currentValue.id + 1 }));
      saveExpenses({ id, value, currency, method, tag, description, exchangeRates });
    }
  }

  deleteRow(id, value) {
    const { eraseRow } = this.props;
    eraseRow(id);
    this.setState((previousValue) => ({
      totalValue: previousValue.totalValue - value }));
  }

  changeExpense(id) {
    this.setState({
      idEdit: id,
      changeTF: true });
  }

  updateExpense() {
    const { expenses, updateExpenses } = this.props;
    const { idEdit, value, currency, method, tag, description } = this.state;
    const { exchangeRates } = expenses.find(({ id }) => id === idEdit);
    const updatedExpense = {
      id: idEdit, value, currency, method, tag, description, exchangeRates,
    };
    const expensesResult = expenses.map(
      (expense) => (expense.id === idEdit ? updatedExpense : expense),
    );
    updateExpenses(expensesResult);
  }

  render() {
    const { savedEmail } = this.props;
    const { exchangeRates, totalValue, idEdit, changeTF } = this.state;

    return (
      <div>
        <WalletHeader
          userData={ savedEmail }
          value={ totalValue }
        />
        <WalletForm
          selectCurrency={ exchangeRates }
          handleChange={ this.handleChange }
          submitFunction={ this.submitRedux }
          idEdit={ idEdit }
          changeTF={ changeTF }
          updateExpense={ this.updateExpense }
        />
        <WalletTable
          deleteRow={ this.deleteRow }
          changeExpense={ this.changeExpense }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedEmail: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (info) => dispatch(saveExpensesInfo(info)),
  eraseRow: (id) => dispatch(eraseExpensesInfo(id)),
  updateExpenses: (upInfo) => dispatch(updateExpenseInfo(upInfo)),
  saveCurrency: (info) => dispatch(saveCurrencies(info)),
});

Wallet.propTypes = {
  savedEmail: PropTypes.string,
  saveExpenses: PropTypes.func.isRequired,
  eraseRow: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  saveCurrency: PropTypes.func.isRequired,
};
Wallet.defaultProps = {
  savedEmail: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
