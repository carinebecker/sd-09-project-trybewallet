import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Header from '../components/Header';
import { setExpenses } from '../actions';
import getExchangeRatesAPI from '../services/exchangeRate';
import ExpensesTable from '../components/ExpensesTable';

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

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  createExpenses() {
    const { addExpenses } = this.props;
    this.getExchangeRates();
    this.setState(({ id }) => ({
      id: id + 1,
    }));
    addExpenses(this.state);
    this.clearFields();
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
      <FormGroup>
        <Label>Valor:</Label>
        <Input
          type="text"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </FormGroup>
    );
  }

  renderDescription(value) {
    return (
      <FormGroup>
        <Label>Descrição:</Label>
        <Input
          type="text"
          data-testid="description-input"
          name="description"
          value={ value }
          onChange={ this.handleChange }
        />
      </FormGroup>
    );
  }

  renderCurrency(value) {
    const { exchangeRates } = this.state;
    return (
      <FormGroup>
        <Label>Moeda:</Label>
        <Input
          type="select"
          name="currency"
          data-testid="currency-input"
          value={ value }
          onChange={ this.handleChange }
        >
          <option>Selecione</option>
          { Object.keys(exchangeRates).map((code) => (
            <option data-testid={ code } key={ code }>{code}</option>)) }
        </Input>
      </FormGroup>
    );
  }

  renderMethod(value) {
    return (
      <FormGroup>
        <Label>Pagamento:</Label>
        <Input
          type="select"
          name="method"
          data-testid="method-input"
          value={ value }
          onChange={ this.handleChange }
        >
          <option>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </Input>
      </FormGroup>
    );
  }

  renderTag(value) {
    return (
      <FormGroup>
        <Label>Categoria:</Label>
        <Input
          type="select"
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
        </Input>
      </FormGroup>
    );
  }

  render() {
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
            color="secondary"
            onClick={ this.createExpenses }
          >
            Adicionar despesa
          </Button>
        </Form>
        <ExpensesTable />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (state) => dispatch(setExpenses(state)),
});

Wallet.propTypes = {
  addExpenses: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
