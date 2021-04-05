import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies as fetchCurrenciesAction,
  saveEdited as saveEditedAction,
} from '../actions/index';

const defaultState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class EditExpensesComponent extends React.Component {
  constructor(props) {
    super(props);

    const { edit, expenses } = this.props;
    const exp = expenses.find((expense) => expense.id === edit);
    const {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    } = exp;
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleEditExpense.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.renderMethodInput = this.renderMethodInput.bind(this);
    this.renderTagInput = this.renderTagInput.bind(this);
    this.renderAddExpensesButton = this.renderEditExpensesButton.bind(this);
    this.renderFormularioDespesas = this.renderFormularioDespesas.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  handleEditExpense() {
    const { saveEdited } = this.props;
    console.log(saveEdited());
    const { value, description, currency, method, tag, id, exchangeRates } = this.state;
    const editedExpenses = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };
    saveEdited(editedExpenses);
    this.setState(defaultState);
  }

  renderCurrencies() {
    const { currencies } = this.props;
    return currencies.map((curr) => (
      <option key={ curr } data-testid={ curr }>{ curr }</option>
    ));
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          data-testid="description-input"
          id="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {this.renderCurrencies()}
        </select>
      </label>
    );
  }

  renderMethodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Metodo de Pagamento:
        <select
          data-testid="method-input"
          id="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagInput() {
    const { tag } = this.state;
    return (
      <>
        <label htmlFor="tag-input">
          Categoria:
          {' '}
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        {' '}
      </>
    );
  }

  renderEditExpensesButton() {
    return (
      <button type="button" onClick={ this.handleEditExpense }>
        Editar despesa
      </button>
    );
  }

  renderFormularioDespesas() {
    return (
      <>
        { this.renderValueInput() }
        { this.renderDescriptionInput() }
        { this.renderCurrencyInput() }
        { this.renderMethodInput() }
        { this.renderTagInput() }
        { this.renderEditExpensesButton() }
      </>
    );
  }

  render() {
    return (<>{ this.renderFormularioDespesas() }</>);
  }
}

EditExpensesComponent.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  edit: PropTypes.number.isRequired,
  saveEdited: PropTypes.func.isRequired,

};

EditExpensesComponent.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  saveEdited: (e) => dispatch(saveEditedAction(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensesComponent);
