import React from 'react';
import Header from './Header';
import Body from './Body';

class ExpenseTable extends React.Component {

  render() {
    return (
      <section>
        <table>
          <Header />
          <Body />
        </table>
      </section>
    );
  }
}

export default ExpenseTable;
