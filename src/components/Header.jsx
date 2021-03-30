import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { Alert } from 'reactstrap';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <Alert color="dark">
          <h2>My Wallet</h2>
          <span data-testid="email-field">
            Email:
            { email }
          </span>
          <span data-testid="total-field">
            Despesa:
            0
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </Alert>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: string.isRequired,
};

export default connect(mapStateToProps)(Header);
