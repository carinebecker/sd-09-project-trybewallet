import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalValue: 0,
    };

    this.valueReducer = this.valueReducer.bind(this);
  }

  async valueReducer(value) {
    const { totalValue } = this.state;
    const soma = totalValue + value;
    this.setState({ totalValue: soma });
  }

  render() {
    const { userEmail } = this.props;
    const { totalValue } = this.state;

    return (
      <div>
        <header className="wallet-header">
          <span data-testid="email-field"><strong>{ userEmail }</strong></span>
          <span data-testid="total-field">
            R$
            { totalValue }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <ExpensesForm valueReducer={ (value) => this.valueReducer(value) } />
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
