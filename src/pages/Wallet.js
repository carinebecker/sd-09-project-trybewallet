import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Forms from '../Components/Forms';
import ExpenseTable from '../Components/ExpenseTable';

class Wallet extends Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        <Forms key={ editor } />
        <ExpenseTable />
      </div>
    );
  }
}

Wallet.defaultProps = {
  editor: false,
};

Wallet.propTypes = {
  editor: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Wallet);
