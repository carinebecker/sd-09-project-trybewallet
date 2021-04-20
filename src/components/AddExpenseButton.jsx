import React from 'react';
import { connect } from 'react-redux';
import { number, string, func, arrayOf } from 'prop-types';
import getCurrencyApi from '../services/currenciesApi';
import { setDataToGlobalState, setExpenseValue, setTotalValue } from '../actions';

class AddExpenseButton extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
    };

    this.setTotalValue = this.setTotalValue.bind(this);
    this.setDataToGlobalState = this.setDataToGlobalState.bind(this);
  }

  setTotalValue(convertedValue) {
    const { sendTotalToState, total } = this.props;
    const newTotal = parseFloat(total) + parseFloat(convertedValue);
    sendTotalToState(newTotal.toFixed(2));
  }

  async setDataToGlobalState() {
    const curencies = await getCurrencyApi();
    const {
      expense,
      description,
      currency,
      method,
      tag,
      sendNewExpenseObj,
      setDefaultValue,
    } = this.props;
    const { id } = this.state;
    const newObj = {
      id,
      value: this.convertExpense(currency, curencies, expense),
      description,
      currency,
      method,
      tag,
      exchangeRates: curencies,
    };
    sendNewExpenseObj(newObj);
    this.setState({ id: id + 1 });
    setDefaultValue();
  }

  convertExpense(currency, curencies, expense) {
    const currencyValue = Object.entries(curencies)
      .find((element) => currency === element[0]);
    const convertedValue = parseFloat(expense) * parseFloat(currencyValue[1].ask);
    this.setTotalValue(convertedValue);
    return expense;
  }

  render() {
    return (
      <button
        type="button"
        onClick={ this.setDataToGlobalState }
      >
        Adicionar despesa
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.expenseReducer.id,
  expense: state.expenseReducer.expense,
  description: state.expenseReducer.description,
  currency: state.expenseReducer.currency,
  method: state.expenseReducer.method,
  tag: state.expenseReducer.tag,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispach) => ({
  sendNewExpenseObj: (expenseObj) => dispach(setDataToGlobalState(expenseObj)),
  sendTotalToState: (total) => dispach(setTotalValue(total)),
  setDefaultValue: () => dispach(setExpenseValue()),
});

AddExpenseButton.propTypes = {
  total: number,
  expense: arrayOf,
  description: string,
  currency: string,
  method: string,
  tag: string,
  sendNewExpenseObj: func,
  setDefaultValue: func,
  sendTotalToState: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseButton);
