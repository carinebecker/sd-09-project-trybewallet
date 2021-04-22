import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setGlobalState as setGlobalStateAction,
  updatesExpense as updatesExpenseAction,
} from '../actions';

class GenericForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderAllAndLintSucks = this.renderAllAndLintSucks.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.lalala = this.lalala.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      id: '',
    };
  }

  componentDidMount() {
    this.updateState();
  }

  updateState() {
    const { id, expenses } = this.props;
    this.setState(expenses.find((element) => element.id === id));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const expenseData = this.state;
    const { expenses, updatesExpense, toggleIsEdit, setGlobalState } = this.props;

    console.log('dfgs');

    const editedExpense = expenses.map((element) => {
      if (element.id === expenseData.id) {
        return element = { ...expenseData };
      }
      return element;
    });

    updatesExpense(editedExpense);

    toggleIsEdit();

    setGlobalState();
  }

  resetState() {
    this.setState((state) => ({
      ...state,
      value: '',
      description: '',
    }));
  }

  lalala() {
    const { value, description } = this.state;
    const { handleChange } = this;
    return (
      <>
        <input
          data-testid="value-input"
          type="number"
          placeholder="Valor"
          name="value"
          value={ value }
          onChange={ (event) => handleChange(event) }
        />
        <input
          data-testid="description-input"
          type="text"
          placeholder="Descrição"
          name="description"
          value={ description }
          onChange={ (event) => handleChange(event) }
        />
      </>
    );
  }

  renderCurrencies(currencies) {
    return (
      currencies.map((element) => (
        <option
          value={ element }
          data-testid={ element }
          key={ element }
        >
          { element }
        </option>
      ))
    );
  }

  renderTag() {
    const tagArray = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      tagArray.map((e) => (
        <option
          value={ e }
          key={ e }
        >
          { e }
        </option>
      ))
    );
  }

  renderMethod() {
    const methodArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      methodArray.map((element) => (
        <option
          value={ element }
          key={ element }
        >
          { element }
        </option>
      ))
    );
  }

  renderAllAndLintSucks() {
    const { handleClick, handleChange } = this;
    const { currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        { this.lalala() }
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ (event) => handleChange(event) }
        >
          { this.renderCurrencies(currencies) }
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (event) => handleChange(event) }
        >
          { this.renderMethod() }
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ (event) => handleChange(event) }
        >
          { this.renderTag() }
        </select>
        <button
          data-testid="edit-btn"
          type="button"
          onClick={ () => handleClick() }
        >
          Editar despesas
        </button>
      </form>
    );
  }

  render() {
    const { renderAllAndLintSucks } = this;
    return (
      renderAllAndLintSucks()
    );
  }
}

GenericForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
  updatesExpense: PropTypes.func.isRequired,
  setGlobalState: PropTypes.func.isRequired,
  toggleIsEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updatesExpense: (editedExpenses) => dispatch(updatesExpenseAction(editedExpenses)),
  setGlobalState: () => dispatch(setGlobalStateAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GenericForm);
