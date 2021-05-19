import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, string } from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getTotal = this.getTotal.bind(this);
  }

  getTotal() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      sum += (value * exchangeRates[currency].ask);
    });
    return parseFloat(sum).toFixed(2);
  }

  render() {
    const { email } = this.props;
    const currency = 'BRL';
    const name = 'TrybeWallet';
    return (
      <header className="wallet-header">
        <h1>{ `Hello, ${name}!` }</h1>
        <section className="header-content">
          <div className="wallet-header-email-field">
            <p data-testid="email-field">{ `Email: ${email}` }</p>
          </div>
          <div className="wallet-header-total-field">
            <p data-testid="total-field">{ `Despesa Total: ${this.getTotal()}` }</p>
            <select data-testid="header-currency-field">
              <option>{ currency }</option>
            </select>
          </div>
        </section>
      </header>
    );
  }
}

Header.propTypes = { expenses: arrayOf(), email: string }.isRequired;

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => (
  { email, expenses });

export default connect(mapStateToProps)(Header);
