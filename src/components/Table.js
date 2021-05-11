import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';
import store from '../store/index';

class Table extends Component {
  constructor() {
    super();
    this.state = {

    };
    this.renderExpenses = this.renderExpenses.bind(this);
    this.alternName = this.alternName.bind(this);
    this.saveNewExpenses = this.saveNewExpenses.bind(this);
  }

  alternName(name) {
    if (name === 'Dólar Americano') {
      return <td>Dólar Comercial</td>;
    }
    return <td>{name}</td>;
  }

  saveNewExpenses(id) {
    const { deleteItems } = this.props;
    const actualExpenses = store.getState().wallet.expenses;
    let newExpenses = [];
    if (actualExpenses !== undefined) {
      newExpenses = actualExpenses.filter((item) => item.id !== id);
    }
    deleteItems(newExpenses);
  }

  renderExpenses() {
    const { expenses } = this.props;
    if (expenses !== undefined) {
      return expenses.map((objects) => (
        <tr key={ objects.id }>
          <td>{objects.description}</td>
          <td>{objects.tag}</td>
          <td>{objects.method}</td>
          <td>{objects.value}</td>
          <td>
            {
              this.alternName(
                (objects.exchangeRates[objects.currency].name).split('/', 2)[0],
              )
            }
          </td>
          <td>{ Number(objects.exchangeRates[objects.currency].ask).toFixed(2) }</td>
          <td>
            { (Number(objects.value)
           * Number(objects.exchangeRates[objects.currency].ask)).toFixed(2)}
          </td>
          <td>Real</td>
          <button
            type="button"
            data-testid="edit-btn"
          >
            Editar despesa
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => { this.saveNewExpenses(objects.id); } }
          >
            Deletar
          </button>
        </tr>
      ));
    }
  }

  render() {
    return (
      <div>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { this.renderExpenses() }
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteItems: (expenses) => dispatch(deleteExpense(expenses)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.objectOf(Array).isRequired,
  deleteItems: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

// teste
