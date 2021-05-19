import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import TableHead from '../components/TableHead';
import TableBody from '../components/TableBody';

class Wallet extends Component {
  render() {
    const { edit } = this.props;
    return (
      <div className="wallet">
        <Header />
        <Form key={ edit } />
        <table className="wallet-table">
          <TableHead />
          <TableBody />
        </table>
      </div>
    );
  }
}

Wallet.propTypes = { edit: bool }.isRequired;

const mapStateToProps = ({ wallet }) => ({ edit: wallet.edit });

export default connect(mapStateToProps)(Wallet);
