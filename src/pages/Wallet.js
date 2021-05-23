import React from 'react';
import Header from '../componentes/Header';
import Formulario from '../componentes/Formulario';
import Tabela from '../componentes/Tabela';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeWallet</p>
        <Header />
        <Formulario />
        <Tabela />
      </div>
    );
  }
}

export default Wallet;
