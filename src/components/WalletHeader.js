import React from 'react';
import PropTypes from 'prop-types';

class WalletHeader extends React.Component {
  render() {
    const { userData, value } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          {`Email: ${userData}`}
        </span>
        <p>
          <span data-testid="total-field">
            {`R$${value}`}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  userData: PropTypes.string,
  value: PropTypes.number,
};
WalletHeader.defaultProps = {
  userData: '',
  value: 0,
};

export default WalletHeader;
