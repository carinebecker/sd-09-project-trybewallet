import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wallet from '../images/wallet.png';
import '../css/walletHeaderCss.css';

class WalletHeader extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <div className="container">
          <div className="left-side">
            <img src={ wallet } className="icon" alt="carteira" />
            <span className="span-left">Projeto Trybe Wallet</span>
          </div>
          <div className="right-side">
            <div className="user-email-spences">
              <div className="header-email" data-testid="email-field">
                Email:
                { email }
              </div>
              <div className="header-total" data-testid="total-field">
                Despesa total: 0
              </div>
              <div className="header-currency" data-testid="header-currency-field">
                BRL
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

WalletHeader.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(WalletHeader);
