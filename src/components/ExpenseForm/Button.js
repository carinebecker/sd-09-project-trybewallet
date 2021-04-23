// Botão para Editar ou Adicionar Despesa
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Button extends React.Component {
  render() {
    const { actionButton, idEdit, expenses, elementsEdit } = this.props;
    const despesa = expenses.find((element) => element.id === idEdit);
    if (actionButton === 'Editar Despesa') {
      console.log('denntro render');
      elementsEdit(despesa);
    }
    return (
      <button type="button">
        { actionButton }
      </button>
    );
  }
}

Button.propTypes = {
  actionButton: PropTypes.string.isRequired,
};

const mapStateToProps = ({ wallet: { expenses, actionButton, idEdit } }) => ({
  expenses,
  actionButton,
  idEdit,
});

export default connect(mapStateToProps)(Button);
