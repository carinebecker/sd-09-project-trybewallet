import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  savesCurrencyList as savesCurrencyListAction,
} from '../actions';
import Header from '../components/Header';
import { currencyList } from '../services/currencyData';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    this.savesCurrencyList();
  }

  async savesCurrencyList() {
    const { savesCurrencyList } = this.props;
    const currencyArray = await currencyList();
    savesCurrencyList(currencyArray);
  }

  render() {
    return (
      <>
        <Header />
        <ExpenseForm />
        <ExpensesTable />
      </>
    );
  }
}

Wallet.propTypes = {
  savesCurrencyList: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savesCurrencyList: (currencies) => dispatch(savesCurrencyListAction(currencies)),
});

export default connect(null, mapDispatchToProps)(Wallet);
