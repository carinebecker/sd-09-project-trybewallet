// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case 'NEW_ACTION':
    return { state: actions.state };
  default:
    return state;
  }
}

export default wallet;
