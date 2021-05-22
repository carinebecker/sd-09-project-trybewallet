import React from 'react';
import { string, number } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <>
        <h2 data-testid="email-field">{ email }</h2>
        <h4 data-testid="total-field">{ total || 0 }</h4>
        <select name="cambio" id="cambio">
          <option data-testid="header-currency-field" value="BRL">BRL</option>
        </select>
      </>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { total } }) => ({
  email,
  total,
});

Header.propTypes = {
  email: string,
  total: number,
}.isRequired;

export default connect(mapStateToProps)(Header);
