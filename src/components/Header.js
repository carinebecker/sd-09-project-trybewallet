import React from 'react';
import { objectOf } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <h2 data-testid="email-field">{ email }</h2>
        <h4 data-testid="total-field">0</h4>
        <select name="cambio" id="cambio">
          <option data-testid="header-currency-field" value="BRL">BRL</option>
        </select>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const email = state.user;
  return email;
};

Header.propTypes = {
  email: objectOf,
}.isRequired;

export default connect(mapStateToProps)(Header);
