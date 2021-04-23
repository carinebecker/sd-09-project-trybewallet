import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeButton } from '../../actions';

class EditButton extends React.Component {
  render() {
    const { changeButtonForEdit, id } = this.props;
    return (
      <button
        data-testid="edit-btn"
        onClick={ () => changeButtonForEdit(id) }
        type="button"
      >
        Editar
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeButtonForEdit: (idEdit) => dispatch(changeButton(idEdit)),
});

EditButton.propTypes = {
  changeButtonForEdit: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(EditButton);
