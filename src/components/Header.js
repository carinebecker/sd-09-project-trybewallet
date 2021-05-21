import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { response } from '../tests/mockData';

class Header extends Component {
  returnTotal() {
    const { total: { expenses } } = this.props;
    if (expenses !== undefined) {
      const data = expenses.map(({ value, currency }) => (
        value * response[currency].ask));
      const sum = data.reduce((amount, iterable) => amount + iterable, 0);
      return sum.toFixed(2);
    }
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.returnTotal() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.objectOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
