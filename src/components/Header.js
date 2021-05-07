import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdMonetizationOn } from 'react-icons/md';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      total: 0,
    };
  }

  componentDidMount() {
    const { email, expenses } = this.props;
    this.updateState(email, expenses);
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (expenses !== prevProps.expenses) {
      this.updateState();
    }
  }

  getConvertCurrency(currentValue) {
    const { currency, value, exchangeRates } = currentValue;
    const currentCurrency = exchangeRates[currency];
    const result = this.convertCurrency(value, currentCurrency.ask);
    return parseFloat(result);
  }

  convertCurrency(currentCurrency, conversionCurrency) {
    const convertedValue = parseFloat(currentCurrency) * parseFloat(conversionCurrency);
    return convertedValue.toFixed(2);
  }

  calculateTotal(expenses) {
    if (!expenses) {
      return 0;
    }
    const convertedValues = expenses.map((expense) => this.getConvertCurrency(expense));
    const total = convertedValues
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return total.toFixed(2);
  }

  updateState() {
    const { email, expenses } = this.props;
    this.setState(() => ({
      email,
      total: this.calculateTotal(expenses),
    }));
  }

  render() {
    const { email, total } = this.state;
    return (
      <header className="header">
        <MdMonetizationOn size={ 50 } />
        <div className="user">
          <div data-testid="email-field">
            {`Email: ${email}`}
          </div>
          <div>
            Dispesa Total:
            <span data-testid="total-field">{total}</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
});

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
