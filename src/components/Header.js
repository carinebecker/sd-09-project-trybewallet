import React from 'react';
import { string, shape, objectOf } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.calcConvertion = this.calcConvertion.bind(this);
  }

  calcConvertion() {
    const { wallet: { expenses } } = this.props;
    console.log(expenses);
    let total = 0;
    expenses.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      console.log(exchangeRates);
      const exchangeValue = exchangeRates[currency] && exchangeRates[currency].ask;
      total += value * Number(exchangeValue);
    });
    return total;
  }

  render() {
    const { userData: { email } } = this.props;
    return (
      <header>
        <div>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">
            {`Despesa Total R$ ${this.calcConvertion()}`}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
  wallet: state.wallet,
});

Header.propTypes = {
  userData: shape({
    email: string.isRequired,
  }).isRequired,
  wallet: shape({
    value: string.isRequired,
    currency: string.isRequired,
    exchangeRates: shape(objectOf).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
