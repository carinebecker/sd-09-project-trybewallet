import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updatesExpense as updatesExpenseAction,
  setGlobalState as setGlobalStateAction,
} from '../actions';
import GenericForm from './GenericForm';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.toggleIsEdit = this.toggleIsEdit.bind(this);
    this.anotherRender = this.anotherRender.bind(this);

    this.state = {
      isEdit: false,
      editId: undefined,
    };
  }

  handleClick(id) {
    const { expenses, updatesExpense } = this.props;
    const filteredExpenses = expenses.filter((element) => element.id !== id);
    console.log(filteredExpenses);

    updatesExpense(filteredExpenses);
  }

  handleEditClick(id) {
    const { setGlobalState } = this.props;
    this.setState({
      isEdit: true,
      editId: id,
    });

    setGlobalState();
  }

  toggleIsEdit() {
    this.setState({
      isEdit: false,
      // id: undefined,
    });
  }

  anotherRender() {
    const { expenses } = this.props;
    const { handleClick, handleEditClick } = this;
    return (
      expenses.map((expense) => {
        const { description, tag, method, value, exchangeRates, id } = expense;
        return (
          <tr key={ id }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ exchangeRates[expense.currency].name.split('/')[0] }</td>
            <td>{ Number(exchangeRates[expense.currency].ask).toFixed(2) }</td>
            <td>{ Number((value * exchangeRates[expense.currency].ask)).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button
                data-testid="edit-btn"
                type="button"
                onClick={ () => handleEditClick(id) }
              >
                Editar
              </button>
              /
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => handleClick(id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    const { editId, isEdit } = this.state;
    const { toggleIsEdit } = this;

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { this.anotherRender() }
          </tbody>
        </table>
        { isEdit && <GenericForm id={ editId } toggleIsEdit={ toggleIsEdit } /> }
      </>
    );
  }
}

ExpensesTable.propTypes = {
  updatesExpense: PropTypes.func.isRequired,
  setGlobalState: PropTypes.func.isRequired,
  savesCurrencyList: PropTypes.func.isRequired,
  expenses: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchCurrencyData: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updatesExpense: (filteredExpenses) => (dispatch(updatesExpenseAction(filteredExpenses))),
  setGlobalState: () => dispatch(setGlobalStateAction()),
})

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
