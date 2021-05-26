import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <span
          data-testid="email-field"
        >
          { `E-Mail: ${email}` }
        </span>
        <span data-testid="total-field">Despesa Total: 0</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropType.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
