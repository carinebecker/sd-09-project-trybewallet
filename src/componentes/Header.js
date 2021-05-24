import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      moeda: 'BRL',
    };
    this.convertValue = this.convertValue.bind(this);
  }

  convertValue(expenses) {
    const totalExpenses = expenses.reduce(
      (total, { currency, value, exchangeRates }) => {
        total += value * exchangeRates[currency].ask;
        return total;
      },
      0.0,
    );

    return totalExpenses.toFixed(2);
  }

  render() {
    const { userEmail, expenses } = this.props;
    const { moeda } = this.state;
    return (
      <header>
        <p data-testid="email-field">
          email:
          {userEmail}
        </p>
        <p data-testid="total-field">{this.convertValue(expenses)}</p>
        <p data-testid="header-currency-field">{ moeda }</p>
      </header>
    );
  }
}
Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
