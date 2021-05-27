import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

class Header extends React.Component {
  amountExpenses() {
    const { expenses } = this.props;
    const amountExpenses = expenses.reduce((acc, cuurentValue) => (
      acc + cuurentValue.value
    ), 0);
    return amountExpenses;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span
          data-testid="email-field"
        >
          { `E-Mail: ${email} ` }
        </span>
        <span data-testid="total-field">
          { `Despesa Total: ${this.amountExpenses()} ` }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropType.string,
  expenses: PropType.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps, null)(Header);
