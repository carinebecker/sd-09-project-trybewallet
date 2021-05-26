import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const value = expenses
      .reduce((val, cur) => (val + (Number(cur.value)
    * Number(cur.exchangeRates[cur.currency].ask))),
      0).toFixed(2);
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          Gastos:
          { value }
        </p>
        <p data-testid="header-currency-field">
          Câmbio utilizado:
          { ' ' }
          BRL
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
