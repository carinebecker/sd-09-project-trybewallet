import React from 'react';
// import '../styles/wallet.css';
import Header from './Header';
import ExpensesForms from './ExpensesForms';
import ExpensesTable from './ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ExpensesForms />
        <ExpensesTable />
      </>
    );
  }
}

export default Wallet;
