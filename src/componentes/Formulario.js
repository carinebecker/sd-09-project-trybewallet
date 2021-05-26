import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, arrayOf, shape } from 'prop-types';
import { addExpense, economyAPI, postEditing } from '../actions/wallet';
import Inputs from './inputs';

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      editingStart: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);
  }

  async componentDidMount() {
    const { propGetApiCurrencie } = this.props;
    await propGetApiCurrencie();
  }

  componentDidUpdate() {
    this.isEditing();
  }

  isEditing() {
    const { editingStart } = this.state;
    const { editingId, isEditing, expenses } = this.props;
    if (isEditing && !editingStart) {
      this.setState({
        value: expenses[editingId].value,
        currency: expenses[editingId].currency,
        method: expenses[editingId].method,
        tag: expenses[editingId].tag,
        description: expenses[editingId].description,
        editingStart: true,
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleAddExpense() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    const {
      id,
      expenses,
      exchangeRates,
      propAddExpense,
      propGetApiCurrencie,
    } = this.props;
    await propGetApiCurrencie();
    const expenseList = expenses.map((expense) => expense);
    const addNewExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    expenseList.push(addNewExpense);
    propAddExpense(expenseList);
    this.setState({
      id: expenses.length === 0 ? 1 : expenses[expenses.length - 1].id + 1,
      value: 0,
      description: '',
    });
  }

  addButton() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleAddExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }

  editButton() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleEditExpense }
        >
          Editar despesa
        </button>
      </div>
    );
  }

  handleEditExpense() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    const { propPostEditing, expenses, editingId } = this.props;
    const edittedExpense = {
      id: parseFloat(editingId),
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: expenses[parseFloat(editingId)].exchangeRates,
    };
    propPostEditing(edittedExpense);
    this.setState({
      editingStart: false,
    });
  }

  render() {
    const { isEditing, currencies } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    return (
      <form>
        <Inputs
          value={ value }
          currency={ currency }
          currencies={ currencies }
          method={ method }
          tag={ tag }
          description={ description }
          handleChange={ this.handleChange }
        />
        {isEditing ? this.editButton() : this.addButton()}
      </form>
    );
  }
}

Formulario.propTypes = {
  expenses: arrayOf(shape({ id: number })),
  id: number,
  propNewExpense: func,
  propGetExchangeRates: func,
}.isRequired;

const mapStateToProps = ({ wallet: {
  expenses,
  id,
  currencies,
  exchangeRates,
  isEditing,
  editingId,
} }) => ({
  expenses,
  id,
  currencies,
  exchangeRates,
  isEditing,
  editingId,
});

const mapDispatchToProps = (dispatch) => ({
  propAddExpense: (expenses) => dispatch(addExpense(expenses)),
  propGetApiCurrencie: () => dispatch(economyAPI()),
  propPostEditing: (expense) => dispatch(postEditing(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
