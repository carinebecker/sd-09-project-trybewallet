import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.calculateExpenses = this.calculateExpenses.bind(this);
  }

  calculateExpenses() {
    const { expenses } = this.props;
    const total = expenses
      .reduce((a, b) => {
        a += (b.value * b.exchangeRates[b.currency].ask);
        return a;
      }, 0);
    return (
      <>
        <span>Despesa Total: R$ </span>
        <span data-testid="total-field">{ total.toFixed(2) }</span>
      </>
    );
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <span>email:</span>
        <span data-testid="email-field">{ email }</span>
        { this.calculateExpenses()}
        <span data-testid="header-currency-field"> BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
