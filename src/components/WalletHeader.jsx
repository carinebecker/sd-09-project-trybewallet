import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends Component {
  constructor(props) {
    super(props);
    this.getExpensesValue = this.getExpensesValue.bind(this);
  }

  getExpensesValue() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      total += (expense.value * expense.exchangeRates[expense.currency].ask);
    });
    return parseFloat(total).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">{ this.getExpensesValue() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
