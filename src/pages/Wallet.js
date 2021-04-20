import React from 'react';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';
import RegisterExpense from '../components/RegisterExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <RegisterExpense />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
