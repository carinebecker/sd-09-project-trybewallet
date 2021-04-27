import React from 'react';
import { arrayOf, objectOf, func } from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { deleteExpense } from '../actions';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderTableRows = this.renderTableRows.bind(this);
  }

  renderTableRows() {
    const { expenses, delExpense, getExpense } = this.props;
    return (
      expenses.map((expense) => {
        const { id, description, tag, method, currency, value,
          exchangeRates } = expense;
        const { name, ask } = exchangeRates[currency];
        return (
          <tr key={ id }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ name }</td>
            <td>{ parseFloat(ask).toFixed(2) }</td>
            <td>{ parseFloat(ask * value).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <Button
                type="button"
                data-testid="edit-btn"
                variant="primary"
                onClick={ () => getExpense(expense) }
              >
                Editar
              </Button>

              <Button
                type="button"
                data-testid="delete-btn"
                variant="danger"
                onClick={ () => delExpense(expense) }
              >
                Excluir
              </Button>
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    const titleTable = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return (
      <Table striped>
        <thead>
          <tr>
            { titleTable.map((title) => <th key={ title }>{ title }</th>) }
          </tr>
        </thead>
        <tbody>
          { this.renderTableRows() }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (expense) => dispatch(deleteExpense(expense)),
});

ExpensesTable.propTypes = {
  expenses: arrayOf(objectOf),
  delExpense: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
