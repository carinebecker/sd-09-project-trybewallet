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
    const total = expenses.reduce((a, b) => parseFloat(a) + parseFloat(b.value), 0);
    return (
      <p data-testid="total-field">
        { `Total Gasto: ${total}` }
      </p>
    );
  }

  render() {
    const { email, isFetching } = this.props;
    return (
      <header>
        <p>Este é o header</p>
        <p data-testid="email-field">{ email }</p>
        { !isFetching
            && this.calculateExpenses()}
        <p data-testid="header-currency-field">Cambio: BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  isFetching: state.wallet.isFetching,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Header);
