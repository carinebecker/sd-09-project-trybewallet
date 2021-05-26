const INITAL_STATE = { currencies: [], expenses: [] };

const walletReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'caso1':
    return state;
  case 'caso2':
    return state;
  default:
    return state;
  }
};

export default walletReducer;
