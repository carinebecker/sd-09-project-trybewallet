import React, { Component } from 'react';

class Forms extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <input
              type="text"
              data-testid="currency-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Forms;
