import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormAddExpenses from './FormAddExpenses';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {email}
          </p>
          <p data-testid="total-field"> 0 </p>
          {/* Valor vai ser atualizado pelo estado */}
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <FormAddExpenses />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps)(Wallet);
