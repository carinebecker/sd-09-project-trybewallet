import React from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends React.Component {
  setTotalValue() {
    const { expensesList } = this.props;
    let total = 0;
    expensesList.forEach(({ value, currency, exchangeRates }) => {
      total += value * exchangeRates[currency].ask;
    });
    return total;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span>email:</span>
        <span data-testid="email-field">{ email }</span>
        <span>Despesas Totais R$:</span>
        <span data-testid="total-field">{ this.setTotalValue() }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  expensesList: state.wallet.expenses,
});

Header.propTypes = {
  email: string,
  total: number,
}.isRequired;

export default connect(mapStateToProps)(Header);
