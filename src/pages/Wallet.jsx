import React from 'react';
// import '../styles/wallet.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import ExpensesForms from './ExpensesForms';
import ExpensesTable from './ExpensesTable';
import EditSelectElement from '../components/EditSelectElement';

class Wallet extends React.Component {
  render() {
    const { isGetEditing } = this.props;
    if (isGetEditing) {
      return (
        <>
          <Header />
          <ExpensesTable />
          <EditSelectElement />
        </>
      );
    }
    return (
      <>
        <Header />
        <ExpensesForms />
        <ExpensesTable />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isGetEditing: state.wallet.editingOldElement,
});

Wallet.propTypes = {
  getCurrency: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
