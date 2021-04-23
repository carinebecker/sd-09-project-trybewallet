import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeExpense } from '../../actions';

class EditButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { expenses, id, changeExp } = this.props;
    const expList = expenses;
    const newExpenses = expList.filter((expense) => expense.id !== id);
    changeExp(newExpenses);
  }

  render() {
    return (
      <button
        data-testid="edit-btn"
        onClick={ this.handleClick }
        type="button"
      >
        Editar
      </button>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  changeExp: (expenses) => dispatch(changeExpense(expenses)),
});

EditButton.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
  changeExp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editutton);
