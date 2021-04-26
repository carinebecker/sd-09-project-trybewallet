import React from 'react';
import Header from '../../components/Header';
import ExpensesForm from '../../components/ExpenseForm';
import ExpenseTable from '../../components/ExpenseTable';
import './style.css';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <ExpensesForm />
        <ExpenseTable />
      </main>
    );
  }
}

export default Wallet;
