import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.css';

class WalletExpenseHeader extends Component {
  calcTotal() {
    const { expenses } = this.props;
    const total = expenses.reduce((accumulator, element) => {
      const convertedValue = (
        Math.round(
          element.value * element.exchangeRates[element.currency].ask * 100,
        ) / 100
      );
      const partialTotal = (
        Math.round((Number(accumulator) + Number(convertedValue)) * 100) / 100
      );
      return partialTotal;
    }, 0);
    return total;
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header-component">
        <h1>TrybeWallet</h1>
        <div className="header-info">
          <div className="header-email">
            <strong>E-mail:</strong>
            <span data-testid="email-field">{ email }</span>
          </div>
          <div className="header-currency">
            <strong>Despesa total:</strong>
            R$
            <span data-testid="total-field">
              { this.calcTotal() }
            </span>
            <span data-testid="header-currency-field"> BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses, /*
  total: state.wallet.total, */
});

WalletExpenseHeader.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps)(WalletExpenseHeader);
