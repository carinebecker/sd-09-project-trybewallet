import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdMonetizationOn } from 'react-icons/md';

import './Header.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header">
        <MdMonetizationOn size={ 50 } />
        <div className="user">
          <div>
            Email:
            <span data-testid="email-field">{ ` ${email}` }</span>
          </div>
          <div>
            Dispesa Total:
            <span data-testid="total-field">
              {(expenses === undefined) ? ' R$ 0,00' : 'xablau'}
            </span>
            <span data-testid="header-currency-field">BRL</span>
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
