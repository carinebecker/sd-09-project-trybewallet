import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpenseAction, editingOldElement } from '../actions';

class EditSelectElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dispesaAtual: {
        id: 0,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.setingState = this.setingState.bind(this);
  }

  componentDidMount() {
    const { getId, getExpenses } = this.props;
    const expenseEdit = getExpenses.find((item) => item.id === getId);
    this.insertData();
    this.setingState(expenseEdit);
  }

  setingState(expenseEdit) {
    this.setState({
      dispesaAtual: expenseEdit,
    });
  }

  insertData() {
    const { currency } = this.props;
    this.setState({
      data: currency,
    });
  }

  handleChange({ target: { name, value } }) {
    const { dispesaAtual } = this.state;
    this.setState({
      dispesaAtual: {
        ...dispesaAtual,
        [name]: value,
      },
    });
  }

  handleClick(dispasaAtual) {
    const { editingExpenseAction, isEditingElement } = this.props;
    // const { dispasaAtual } = this.state;
    const values = dispasaAtual;
    editingExpenseAction(values.id, values);
    isEditingElement();
  }

  inputsWithLabel({ value, description }) {
    return (
      <>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }

  selectMoedas(data, { currency }) {
    return (
      <select
        name="currency"
        id="currency"
        data-testid="currency-input"
        value={ currency }
        onChange={ this.handleChange }
      >
        {data.map((item) => (
          <option data-testid={ item } key={ item }>{ item }</option>
        ))}
      </select>
    );
  }

  selectTag({ tag }) {
    return (
      <select
        name="tag"
        id="tag"
        data-testid="tag-input"
        value={ tag }
        onChange={ this.handleChange }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  paymenteSelect({ method }) {
    return (
      <select
        name="method"
        value={ method }
        data-testid="method-input"
        onChange={ this.handleChange }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  render() {
    const { data, dispesaAtual } = this.state;
    return (
      <form action="">
        { this.inputsWithLabel(dispesaAtual) }
        { this.selectMoedas(data, dispesaAtual) }
        { this.selectTag(dispesaAtual) }
        { this.paymenteSelect(dispesaAtual) }
        <button
          type="button"
          onClick={ () => this.handleClick(dispesaAtual) }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  currency: state.wallet.currencies,
  getId: state.wallet.id,
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editingExpenseAction: (id, expense) => dispatch(editExpenseAction(id, expense)),
  isEditingElement: () => dispatch(editingOldElement()),
});

EditSelectElement.propTypes = {
  addExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(EditSelectElement);
