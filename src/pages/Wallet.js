import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <section>
        <div className="wallet-head">
          <span data-testid="email-field">
            {`Email: ${email}`}
          </span>
          <span data-testid="total-field">
            Despesa Total: 0
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
        <ExpenseForm />
      </section>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

export default connect(mapStateToProps, null)(Wallet);
