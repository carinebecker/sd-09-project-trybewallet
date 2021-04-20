import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';
import FormWallet from '../component/formWallet';
import ExpenseAddForm from '../component/ExpenseAddForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.handleTotalValue = this.handleTotalValue.bind(this);
  }

  componentDidMount() {
    const { currencyDispatcher } = this.props;
    currencyDispatcher();
  }

  handleTotalValue() {
    const { expensesState } = this.props;

    const sumTotal = expensesState
      .map(({ value, currency, exchangeRates }) => exchangeRates[currency].ask * value);
    return sumTotal.reduce((acc, cur) => acc + cur, 0).toFixed(2);
  }

  render() {
    const { emailStore } = this.props;
    return (
      <main>
        <header>
          <h1>Wallet</h1>
          <ul>
            <li data-testid="email-field">{ emailStore }</li>
            <li data-testid="total-field">{ this.handleTotalValue() }</li>
            <li data-testid="header-currency-field">BRL</li>
          </ul>
        </header>
        <FormWallet totalValue={ this.handleTotalValue() } />
        <ExpenseAddForm />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencyDispatcher: () => dispatch(getCurrencies()),
});

const mapStateToProps = (state) => ({
  emailStore: state.user.email,
  expensesState: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  currencyDispatcher: PropTypes.func.isRequired,
  emailStore: PropTypes.objectOf.isRequired,
  expensesState: PropTypes.objectOf.isRequired,
};
