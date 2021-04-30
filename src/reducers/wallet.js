const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCounter: 0,
  editMode: false,
  idEditing: '',
};

const addExpense = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'SET_CURRENCIES':
    return { ...state, currencies: action.payload };
  case 'SET_ID_COUNTER':
    return { ...state, idCounter: state.idCounter + 1 };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      })],
    };
  case 'EDIT_MODE':
    return { ...state, editMode: !state.editMode };
  case 'EDIT_ID':
    return { ...state, idEditing: action.payload };
  default:
    return state;
  }
};

export default addExpense;
