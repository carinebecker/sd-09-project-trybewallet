import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  handleValue() {
    const { stateValue } = this.props;
    let sumAll = 0;
    stateValue.forEach((item) => {
      const exchangeAsk = item.exchangeRates[item.currency].ask * parseFloat(item.value);
      sumAll += exchangeAsk;
    });
    return sumAll;
  }

  render() {
    const { userData } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          {`Email: ${userData}`}
        </span>
        <p>
          <span data-testid="total-field">
            {`R$${this.handleValue().toFixed(2)}`}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  userData: PropTypes.string,
  stateValue: PropTypes.string,
};
WalletHeader.defaultProps = {
  userData: '',
  stateValue: 0,
};

const mapStateToProps = (state) => ({
  stateValue: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(WalletHeader);
