import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletThunk } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { apiCurrencies } = this.props;
    apiCurrencies();
  }

  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce(
      (acc, expense) => (
        acc + (parseInt(expense.value, 10)
        * expense.exchangeRates[expense.currency].ask)
      ), 0,
    );

    return (
      <header>
        <p>
          Usuário:
          {' '}
          <span data-testid="email-field">
            {email}
          </span>
        </p>
        <p>
          Despesas: R$
          <span data-testid="total-field">{total.toFixed(2)}</span>
        </p>
        <p>
          Moeda de Câmbio:
          {' '}
          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  apiCurrencies: () => dispatch(walletThunk()),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  apiCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
