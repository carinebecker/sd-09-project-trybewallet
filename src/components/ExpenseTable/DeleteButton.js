import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeExpense } from '../../actions';

class DeleteButton extends React.Component {
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
        data-testid="delete-btn"
        onClick={ this.handleClick }
        type="button"
      >
        Deletar
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

DeleteButton.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
  changeExp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
