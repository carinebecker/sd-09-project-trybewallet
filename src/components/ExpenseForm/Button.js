// Botão para Editar ou Adicionar Despesa
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Button extends React.Component {
  render() {
    let msgButton = 'Adicionar Despesa';
    const { actionButton, idEdit, expenses, elementsEdit, handleClick } = this.props;
    const exp = expenses.find((element) => element.id === idEdit);
    if (actionButton === true) {
      elementsEdit(exp);
      msgButton = 'Editar Despesa';
    }
    return (
      <button
        type="button"
        onClick={ () => handleClick(msgButton, idEdit) }
      >
        { msgButton }
      </button>
    );
  }
}

Button.defaultProps = {
  idEdit: '',
};

Button.propTypes = {
  actionButton: PropTypes.string.isRequired,
  idEdit: PropTypes.number,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  elementsEdit: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses, actionButton, idEdit } }) => ({
  expenses,
  actionButton,
  idEdit,
});

export default connect(mapStateToProps)(Button);
