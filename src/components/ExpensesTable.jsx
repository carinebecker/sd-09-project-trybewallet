import React from 'react';
import { arrayOf, objectOf } from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';

class ExpensesTable extends React.Component {
  render() {
    const titleTable = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    const { expenses } = this.props;
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
                    <Button type="button" color="danger">Excluir</Button>
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

ExpensesTable.propTypes = {
  expenses: arrayOf(objectOf),
}.isRequired;

export default connect(mapStateToProps)(ExpensesTable);
