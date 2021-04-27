import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, editingItem } from '../actions';

class EditSelectedItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.renderSelection = this.renderSelection.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.getSetState = this.getSetState.bind(this);
  }

  componentDidMount() {
    const { getId, getExpense } = this.props;
    const expenseEdit = getExpense.find((item) => item.id === getId);
    console.log(expenseEdit);
    this.getSetState(expenseEdit);
  }

  getSetState(expenseEdit) {
    this.setState({ ...expenseEdit });
  }

  handleInputs({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  saveExpense() {
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  editExpense() {
    const { editExpenseArray, setEditing } = this.props;
    const expenseObj = this.state;
    editExpenseArray(expenseObj, expenseObj.id);
    setEditing();
  }

  renderSelection() {
    const { currencyArray } = this.props;
    const { currency } = this.state;
    return (
      <select
        value={ currency }
        onChange={ this.handleInputs }
        name="currency"
        data-testid="currency-input"
      >
        <option>Selecione uma moeda</option>
        { Object.keys(currencyArray)
          .map((coin) => (
            <option value={ coin } data-testid={ coin } key={ coin }>{coin}</option>
          )) }
      </select>
    );
  }

  renderValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          name="value"
          value={ value }
          onChange={ this.handleInputs }
          data-testid="value-input"
        />
      </label>
    );
  }

  renderDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          value={ description }
          onChange={ this.handleInputs }
          name="description"
          data-testid="description-input"
        />
      </label>
    );
  }

  renderMethod() {
    const { method } = this.state;
    return (
      <select
        data-testid="method-input"
        onChange={ this.handleInputs }
        value={ method }
        name="method"
      >
        <option>Selecione uma opção</option>
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    );
  }

  renderTag() {
    const { tag } = this.state;
    return (
      <select
        onChange={ this.handleInputs }
        value={ tag }
        data-testid="tag-input"
        name="tag"
      >
        <option>Selecione uma opção</option>
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    );
  }

  renderButton() {
    return (
      <button
        type="button"
        onClick={ this.editExpense }
      >
        Editar despesa
      </button>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          { this.renderValue(value) }
          { this.renderDescription(description) }
          { this.renderSelection(currency) }
          { this.renderMethod(method) }
          { this.renderTag(tag) }
        </form>
        { this.renderButton() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyArray: state.wallet.currencies,
  getExpense: state.wallet.expenses,
  getId: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenseArray: (expense, id) => dispatch(editExpense(expense, id)),
  setEditing: () => dispatch(editingItem()),
});

EditSelectedItem.propTypes = {
  saveExpense: PropTypes.func,
  currencies: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(EditSelectedItem);
