import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyApi, receiveExpenses, totalExpenses } from '../actions';
import currencyApi from '../services/currencyApi';
import Tables from '../components/Tables';
import {
  renderEmailUser,
  renderTotalExpenditure,
  renderExpenseAmount,
  renderExpenseDescription,
  renderSelectCurrency,
  renderMethodPayment,
  renderRecreation } from '../services/createInputsWallet';

const initialState = {
  valueExpense: '',
  descriptionExpense: '',
  selectCurrency: 'USD',
  methodPayment: 'Dinheiro',
  categoryRecreation: 'Alimentação',
  isDisable: true,
  idToEdit: 0,
  editor: false,
};

// Tive auxilio da Nathália Veneziano, pois tive algumas dificuldades. 
class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.addExpenses = this.addExpenses.bind(this);
    this.handlerTargetChange = this.handlerTargetChange.bind(this);
    this.upDateWallet = this.upDateWallet.bind(this);
    this.upDateExpense = this.upDateExpense.bind(this);

    this.state = initialState;
  }

  componentDidMount() {
    const { requestCurrency } = this.props;
    requestCurrency();
  }

  componentDidUpdate(prevProps) {
    const { editor } = this.props;
    if (prevProps.editor !== editor) {
      this.upDateWallet();
    }
  }

  async addExpenses() {
    const { valueExpense,
      descriptionExpense,
      selectCurrency,
      methodPayment,
      categoryRecreation } = this.state;
    const { walletCurrecy, totalExpensesState,
      receiveExpensesDispatch, totalExpensesDispatch } = this.props;
    const id = walletCurrecy.length;
    const currencyApis = await currencyApi();
    // o objeto abaixo está sendo atualizado de acordo com o que pede no mockData
    const newExpenses = { value: valueExpense,
      description: descriptionExpense,
      currency: selectCurrency,
      method: methodPayment,
      tag: categoryRecreation,
      id,
      exchangeRates: currencyApis,
    };
    const expenses = [...walletCurrecy, newExpenses];
    const total = ((valueExpense * currencyApis[selectCurrency]
      .ask) + totalExpensesState);
    const round = Math.round(total * 100) / 100;
    // selectCurrency está entre [] por ser dinâmico, caso não fosse, seria . + o nome da moeda
    await receiveExpensesDispatch(expenses);
    totalExpensesDispatch(round);
    // setState está limpando os campos que foram digitados após as ações feitas
    this.setState(initialState);
  }

  handlerTargetChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { valueExpense, descriptionExpense,
        selectCurrency,
        methodPayment,
        categoryRecreation } = this.state;
      if (valueExpense
        && descriptionExpense
        && selectCurrency
        && methodPayment
        && categoryRecreation) {
        this.setState({ isDisable: false });
      } else {
        this.setState({ isDisable: true });
      }
    });
  }

  upDateWallet() {
    const { idToEdit, editor, walletCurrecy } = this.props;
    const inputs = walletCurrecy.filter((expense) => expense.id === idToEdit)[0];
    this.setState({
      editor,
      valueExpense: inputs.value,
      descriptionExpense: inputs.description,
      selectCurrency: inputs.currency,
      methodPayment: inputs.method,
      categoryRecreation: inputs.tag,
      isDisable: false,
    });
  }

  upDateExpense() {
    const { valueExpense, descriptionExpense,
      selectCurrency,
      methodPayment,
      categoryRecreation } = this.state;
    const { idToEdit,
      walletCurrecy,
      receiveExpensesDispatch,
      totalExpensesDispatch } = this.props;
    const expensesUpdate = walletCurrecy.map((expense) => {
      if (idToEdit === expense.id) {
        return { ...expense,
          value: valueExpense,
          description: descriptionExpense,
          currency: selectCurrency,
          method: methodPayment,
          tag: categoryRecreation,
        };
      }
      return expense;
    });
    receiveExpensesDispatch(expensesUpdate);
    const reduceTotal = expensesUpdate
      .reduce((total, { value, currency, exchangeRates }) => {
        const moeda = exchangeRates[currency].ask;
        const round = Math.round((moeda * value) * 100) / 100;
        return round + total;
      }, 0);
    totalExpensesDispatch(reduceTotal);
  }

  render() {
    const { userLogin, currencyToExchange,
      totalExpensesState, currencies } = this.props;
    const { valueExpense, descriptionExpense,
      selectCurrency,
      methodPayment,
      categoryRecreation, isDisable, editor } = this.state;
    return (
      <div>
        <header>
          <Link to="/carteira">Carteira</Link>
          { renderEmailUser(userLogin) }
          { renderTotalExpenditure(currencyToExchange, totalExpensesState) }
        </header>
        <br />
        <section>
          <form>
            { renderExpenseAmount(valueExpense, this.handlerTargetChange) }
            { renderExpenseDescription(descriptionExpense, this.handlerTargetChange) }
            { renderSelectCurrency(selectCurrency, currencies, this.handlerTargetChange) }
            { renderMethodPayment(methodPayment, this.handlerTargetChange) }
            { renderRecreation(categoryRecreation, this.handlerTargetChange) }
            { !editor ? (
              <button
                type="button"
                id="button-expense"
                onClick={ this.addExpenses }
                disabled={ isDisable }
              >
                Adicionar despesa
              </button>
            ) : (
              <button
                type="button"
                id="button-update-expense"
                onClick={ this.upDateExpense }
                disabled={ isDisable }
              >
                Editar despesa
              </button>
            )}
          </form>
          <Tables />
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userLogin: state.user.email,
  walletCurrecy: state.wallet.expenses,
  currencyToExchange: state.wallet.currencyToExchange,
  totalExpensesState: state.wallet.totalExpenses,
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurrency: () => dispatch(fetchCurrencyApi()),
  receiveExpensesDispatch: (expenses) => dispatch(receiveExpenses(expenses)),
  totalExpensesDispatch: (total) => dispatch(totalExpenses(total)),
});

Wallet.propTypes = {
  userLogin: PropTypes.string.isRequired,
  walletCurrecy: PropTypes.arrayOf.isRequired,
  currencyToExchange: PropTypes.string.isRequired,
  totalExpensesState: PropTypes.number.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  totalExpensesDispatch: PropTypes.number.isRequired,
  receiveExpensesDispatch: PropTypes.arrayOf.isRequired,
  requestCurrency: PropTypes.func.isRequired,
};
// mapStateToProps: ela pega as informações do estado e atualiza onde está sendo solicitado
// mapdispatchtoprops: vai disparar uma ação e alterar uma informação no state
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
