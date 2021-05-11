import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpenses } from '../actions';
import '../App.css';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    const { editableExpense } = props;
    const { value, description, currency, method, tag } = editableExpense;
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      methods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tags: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  updateExpense() {
    const { currencies, editableExpense, expenses, updatedExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newExpense = {
      id: editableExpense.index,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    const newExpenses = expenses;
    newExpenses[editableExpense.index] = newExpense;
    updatedExpense(newExpenses);
  }

  // Baseado na solução do Felipe Rocha
  renderInput(label, type, name, value) {
    return (
      <label htmlFor={ name }>
        {`${label}:`}
        <input
          className="expense-form-input"
          name={ name }
          onChange={ this.handleChange }
          type={ type }
          value={ value }
          data-testid={ `${name}-input` }
        />
      </label>
    );
  }

  // Baseado na solução do Felipe Rocha
  renderSelect(label, name, options, value) {
    return name === 'currency'
      ? (
        <div>
          {`${label}:`}
          <select
            className="expense-form-input"
            name={ name }
            onChange={ this.handleChange }
            value={ value }
            data-testid="currency-input"
          >
            {Object.keys(options).filter((curr) => curr !== 'USDT')
              .map((curr) => (<option key={ curr } data-testid={ curr }>{curr}</option>))}
          </select>
        </div>
      )
      : (
        <div>
          {`${label}:`}
          <select
            className="expense-form-input"
            name={ name }
            onChange={ this.handleChange }
            value={ value }
            data-testid={ `${name}-input` }
          >
            {options.map((curr) => (<option key={ curr }>{curr}</option>))}
          </select>
        </div>
      );
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, methods, tags } = this.state;
    return (
      <section>
        <form className="expense-form">
          <div>
            {this.renderInput('Valor', 'number', 'value', value)}
            {this.renderInput('Descrição', 'text', 'description', description)}
            {this.renderSelect('Moedas', 'currency', currencies, currency)}
            {this.renderSelect(
              'Forma de pagamento',
              'method',
              methods,
              method,
            )}
            {this.renderSelect('Categorias', 'tag', tags, tag)}
          </div>
          <button
            type="button"
            onClick={ this.updateExpense }
            className="expense-form-button"
          >
            Editar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editableExpense: wallet.editableExpense,
  expenses: wallet.expenses,
  total: wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  updatedExpense: (expenses) => dispatch(updateExpenses(expenses)),
});

EditForm.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  editableExpense: PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedExpense: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
