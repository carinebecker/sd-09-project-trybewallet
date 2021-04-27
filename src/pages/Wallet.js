import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { fetchCurrency } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import Header from '../components/Header';
import EditSelectedItem from '../components/EditSelectedItem';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  render() {
    const { getEditing } = this.props;
    if (getEditing === false) {
      return (
        <>
          <Header />
          <ExpenseForm />
          <ExpenseTable />
        </>
      );
    }
    return (
      <div>
        <Header />
        <ExpenseTable />
        <EditSelectedItem />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  getEditing: state.expenseReducer.editingItem,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()),
});

Wallet.propTypes = {
  getCurrency: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
