import React from 'react';

class FormAddExpenses extends React.Component {
  render() {
    return (
      <div>
        <form>
          Valor
          <input
            data-testid="value-input"
            name="value"
            type="text"
          />
          Moeda
          <input
            data-testid="description-input"
            name="description"
            type="text"
          />

        </form>
      </div>
    );
  }
}

export default FormAddExpenses;
