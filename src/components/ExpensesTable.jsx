import React from 'react';
import { arrayOf, objectOf, func } from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { deleteExpense } from '../actions';

class ExpensesTable extends React.Component {
  render() {
    const titleTable = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    const { expenses, delExpense } = this.props;
    return (
      <Table striped>
        <thead>
          <tr>
            { titleTable.map((title) => <th key={ title }>{ title }</th>) }
          </tr>
        </thead>
        <tbody>
          {
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
                    <Button type="button" color="primary">Editar</Button>
                    <Button
                      type="button"
                      data-testid="delete-btn"
                      color="danger"
                      onClick={ () => delExpense(expense) }
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              );
            })
          }
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
