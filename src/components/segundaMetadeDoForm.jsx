import React from 'react';

class segundaMetadeDoForm extends React.Component {
  render() {
    const { method, tag, handleClick, handleChange } = this.props;
    return (
      <>
        <label htmlFor="method">
          Método de pagamento utilizado
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={method}
            onChange={(event) => handleChange(event)}
          >
            {
              ['Dinheiro', 'Cartão de crédito', 'Cartão de débito']
                .map((element) => (
                  <option
                    value={ element }
                    key={ element }
                  >
                    { element }
                  </option>
                ))
            }
          </select>
        </label>
        <label htmlFor="tag">
          Selecione uma categoria
                <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={tag}
            onChange={(event) => handleChange(event)}
          >
            {
              ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
                .map((e) => (
                  <option
                    value={e}
                    key={e}
                  >
                    { e}
                  </option>
                ))
            }
          </select>
        </label>
        <button
          data-testid="edit-btn"
          type="button"
          onClick={() => handleClick()}
        >
          Editar despesas
        </button>
      </>
    );
  }
}

export default segundaMetadeDoForm;
