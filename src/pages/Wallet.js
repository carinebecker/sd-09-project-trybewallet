import React from 'react';
import Header from './Header';
import ExpensesInputs from '../components/ExpensesInputs';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpensesInputs />
      </div>
    );
  }
}

export default Wallet;
