import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdMonetizationOn } from 'react-icons/md';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      total: 0,
    }
  }

  componentDidMount() {
    const { email, expenses } = this.props;
    this.setState(() => ({
      email,
      total: this.calculateTotal(expenses),
    }));
  }

  convertCurrency(currentCurrency, conversionCurrency) {
    const convertedValue = parseFloat(currentCurrency) * parseFloat(conversionCurrency);
    return convertedValue.toFixed(2);
  }

  getConvertCurrency(currentValue) {
    const { currency, value, exchangeRates} = currentValue;
    const currentCurrency = exchangeRates.find(({ code }) => code === currency);
    const result = this.convertCurrency(value, currentCurrency.ask);
    return parseFloat(result);
  }

  calculateTotal(expenses) {
    // const { value, } = expenses;
    if (!expenses) {
      return 0;
    }
    const convertedValues = expenses.map((expense) => this.getConvertCurrency(expense));

    const total = convertedValues
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return total;
  }

  render() {
    const { email, total } = this.state;
    // const { email, expenses } = this.props;
    // console.log(expenses);
    return (
      <header className="header">
        <MdMonetizationOn size={ 50 } />
        <div className="user" >
          <div data-testid="email-field">
            { `Email: ${email}` }
            {/* <span data-testid="email-field">{ ` ${email}` }</span> */}
          </div>
          <div>
            {`Dispesa Total: ${total.toFixed(2)}`}
            {/* <span data-testid="total-field">
              {(expenses === undefined) ? ' R$ 0,00' : 'xablau'}
            </span> */}
            <span data-testid="header-currency-field">{` BRL`}</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
});

Header.propTypes = {
  expenses: PropTypes.shape({
    optionalProperty: PropTypes.arrayOf(),
    requiredProperty: PropTypes.number,
  }).isRequired,
  email: PropTypes.string.isRequired,
};

// export default Header;
export default connect(mapStateToProps)(Header);
