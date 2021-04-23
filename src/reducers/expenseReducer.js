const INITIAL_STATE = {
  id: 0,
  value: 0,
  description: '',
  currency: '',
  method: '',
  tag: '',
};

const expenseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'NEW_EXPENSE':
    return { ...state, [action.name]: action.value };
  case 'DEFAULT_VALUE':
    return { ...state, expense: action.default };
  case 'SET_ID':
    return { ...state, id: state.id + 1 };
  default:
    return state;
  }
};

export default expenseReducer;
