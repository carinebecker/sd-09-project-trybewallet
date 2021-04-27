import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

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
      <Form.Group>
        <Form.Label>Valor:</Form.Label>
        <Form.Control
          type="text"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </Form.Group>
    );
  }

  renderDescription(value) {
    return (
      <Form.Group>
        <Form.Label>Descrição:</Form.Label>
        <Form.Control
          type="text"
          data-testid="description-input"
          name="description"
          value={ value }
          onChange={ this.handleChange }
        />
      </Form.Group>
    );
  }

  renderCurrency(value) {
    const { exchangeRates } = this.state;
    return (
      <Form.Group>
        <Form.Label>Moeda:</Form.Label>
        <Form.Control
          as="select"
          size="lg"
          name="currency"
          data-testid="currency-input"
          value={ value }
          onChange={ this.handleChange }
        >
          <option>Selecione</option>
          { Object.keys(exchangeRates).map((code) => (
            <option data-testid={ code } key={ code }>{code}</option>)) }
        </Form.Control>
      </Form.Group>
    );
  }

  renderMethod(value) {
    return (
      <Form.Group>
        <Form.Label>Pagamento:</Form.Label>
        <Form.Control
          as="select"
          size="lg"
          name="method"
          data-testid="method-input"
          value={ value }
          onChange={ this.handleChange }
        >
          <option>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </Form.Control>
      </Form.Group>
    );
  }

  renderTag(value) {
    return (
      <Form.Group>
        <Form.Label>Categoria:</Form.Label>
        <Form.Control
          as="select"
          size="lg"
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
        </Form.Control>
      </Form.Group>
    );
  }

  render() {
    const { edtExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <section>
        <Header />
        <Form>
          { this.renderValue(value) }
          { this.renderDescription(description) }
          { this.renderCurrency(currency) }
          { this.renderMethod(method) }
          { this.renderTag(tag) }
          <Button
            type="button"
            variant="secondary"
            onClick={ this.createExpenses }
          >
            Adicionar despesa
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={ () => edtExpense(this.state) }
          >
            Editar despesa
          </Button>
        </Form>
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
