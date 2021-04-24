import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailGot } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ emailGot }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailGot: state.user.email,
});

Header.propTypes = {
  emailGot: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
