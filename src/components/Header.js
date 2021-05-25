import React from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  total() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      sum += (value * exchangeRates[currency].ask);
    });
    return sum.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <h2 data-testid="email-field">{ email }</h2>
        <h4 data-testid="total-field">{ this.total() }</h4>
        <select name="cambio" id="cambio">
          <option data-testid="header-currency-field" value="BRL">BRL</option>
        </select>
      </>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

Header.propTypes = {
  email: string,
  expenses: func,
}.isRequired;

export default connect(mapStateToProps)(Header);
