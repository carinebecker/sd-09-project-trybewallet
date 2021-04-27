import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { saveExpenses, editExpense } from '../actions';
import ExpensesTable from '../components/ExpensesTable';
import getExchangeRatesAPI from '../services/exchangeRate';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.getExchangeRates = this.getExchangeRates.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.createExpenses = this.createExpenses.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.getExpense = this.getExpense.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    this.getExchangeRates();
  }

  async getExchangeRates() {
    try {
      this.setState({ exchangeRates: await getExchangeRatesAPI() });
    } catch (error) {
      console.log(error);
    }
  }

  getExpense(edExpense) {
    const { id, value, description, currency, method, tag, exchangeRates } = edExpense;
    this.setState({ id, value, description, currency, method, tag, exchangeRates });
  }

  createExpenses() {
    const { addExpenses } = this.props;
    this.getExchangeRates();
    this.setState(({ id }) => ({ id: id + 1 }));
    addExpenses(this.state);
    this.clearFields();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clearFields() {
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  renderValue(value) {
    return (
      <div>
        {/* <label>Valor:</label> */}
        <input
          type="text"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </div>
    );
  }

  renderDescription(value) {
    return (
      <div>
        {/* <label>Descrição:</label> */}
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ value }
          onChange={ this.handleChange }
        />
      </div>
    );
  }

  renderCurrency(value) {
    const { exchangeRates } = this.state;
    return (
      <div>
        {/* <label>Moeda:</label> */}
        <select
          name="currency"
          data-testid="currency-input"
          value={ value }
          onChange={ this.handleChange }
        >
          <option>Selecione</option>
          { Object.keys(exchangeRates).map((code) => (
            <option data-testid={ code } key={ code }>{code}</option>)) }
        </select>
      </div>
    );
  }

  renderMethod(value) {
    return (
      <div>
        {/* <label>Pagamento:</label> */}
        <select
          name="method"
          data-testid="method-input"
          value={ value }
          onChange={ this.handleChange }
        >
          <option>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </div>
    );
  }

  renderTag(value) {
    return (
      <div>
        {/* <label>Categoria:</label> */}
        <select
          name="tag"
          data-testid="tag-input"
          value={ value }
          onChange={ this.handleChange }
        >
          <option>Selecione</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }

  render() {
    const { edtExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <section>
        <Header />
        <div>
          { this.renderValue(value) }
          { this.renderDescription(description) }
          { this.renderCurrency(currency) }
          { this.renderMethod(method) }
          { this.renderTag(tag) }
          <button
            type="button"
            onClick={ this.createExpenses }
          >
            Adicionar despesa
          </button>
          <button
            type="button"
            onClick={ () => edtExpense(this.state) }
          >
            Editar despesa
          </button>
        </div>
        <ExpensesTable getExpense={ this.getExpense } />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (state) => dispatch(saveExpenses(state)),
  edtExpense: (state) => dispatch(editExpense(state)),
});

Wallet.propTypes = {
  addExpenses: func.isRequired,
  edtExpense: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
