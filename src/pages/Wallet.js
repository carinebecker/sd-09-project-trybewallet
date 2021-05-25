import React, { Component } from 'react';
import Header from '../Components/Header';
import Forms from '../Components/Forms';
import ExpenseTable from '../Components/ExpenseTable';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <Forms />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
