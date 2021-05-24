import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletHeader from '../components/WalletHeader';
import WalletForm from '../components/WalletForm';
import { saveExpensesInfo, eraseExpensesInfo } from '../actions/expensesAction';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.apiFetch = this.apiFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitRedux = this.submitRedux.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
      totalValue: 0,
    };
  }

  componentDidMount() {
    this.apiFetch();
  }

  async apiFetch() {
    const fetchCurrencyApi = await fetch('https://economia.awesomeapi.com.br/json/all').then((response) => response.json());
    delete fetchCurrencyApi.USDT;
    this.setState({
      exchangeRates: fetchCurrencyApi,
    });
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
    this.handleValue(Number(value) * parseFloat(exchangeRates[currency].ask));
    this.setState((currentValue) => ({ id: currentValue.id + 1 }));
    saveExpenses({ id, value, currency, method, tag, description, exchangeRates });
  }

  deleteRow(id, value) {
    const { eraseRow } = this.props;
    eraseRow(id);
    this.setState((previousValue) => ({
      totalValue: previousValue.totalValue - value }));
  }

  render() {
    const { savedEmail } = this.props;
    const { exchangeRates, totalValue } = this.state;

    return (
      <div>
        <WalletHeader userData={ savedEmail } value={ totalValue } />
        <WalletForm
          selectCurrency={ exchangeRates }
          handleChange={ this.handleChange }
          submitFunction={ this.submitRedux }
        />
        <WalletTable
          deleteRow={ this.deleteRow }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedEmail: state.user.email,
  stateValue: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (info) => dispatch(saveExpensesInfo(info)),
  eraseRow: (id) => dispatch(eraseExpensesInfo(id)),
});

Wallet.propTypes = {
  savedEmail: PropTypes.string,
  saveExpenses: PropTypes.func.isRequired,
  eraseRow: PropTypes.func.isRequired,
};
Wallet.defaultProps = {
  savedEmail: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
