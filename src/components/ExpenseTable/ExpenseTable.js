import React from 'react';
import Header from './Header';
import Body from './Body';

class ExpenseTable extends React.Component {
  render() {
    return (
      <section>
        <table className="expTable">
          <thead>
            <Header />
          </thead>
          <tbody>
            <Body />
          </tbody>
        </table>
      </section>
    );
  }
}

export default ExpenseTable;
