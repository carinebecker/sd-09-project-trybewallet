import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormAddExpenses from './FormAddExpenses';
import Table from './Table';

class Wallet extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <header>
          <h1 data-testid="email-field">{`Bem-vindo ${email}`}</h1>
          <p data-testid="total-field">{` Despesa Total: R$ ${total || 0}`}</p>
          <p data-testid="header-currency-field">Cambio: BRL</p>
        </header>
        <FormAddExpenses />
        <Table />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps)(Wallet);
