import React from 'react';
import SpencesForm from '../components/SpencesForm';
import WalletHeader from '../components/WalletHeader';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <SpencesForm />
      </div>
    );
  }
}

export default Wallet;
