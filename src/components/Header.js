import React, { Component } from 'react';
import { string, arrayOf } from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  convertedValues() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.value * expense.exchangeRates[expense.currency].ask;
    });
    return parseFloat(total.toFixed(2));
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          {' '}
          E-mail:
          {' '}
          { email }
        </p>
        <p data-testid="total-field">{ this.convertedValues() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: string,
  expenses: arrayOf([]),
}.isRequired;

export default connect(mapStateToProps, null)(Header);
