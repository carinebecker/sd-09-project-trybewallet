import {
  // REQUEST_EXCHANGE_RATE,
  // RECEIVE_EXCHANGE_RATE,
  EXPENSES,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  expenses: [],
};

// const reducerWallet = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//   case REQUEST_EXCHANGE_RATE:
//     return { ...state, isLoading: true };

//   case RECEIVE_EXCHANGE_RATE:
//     return { ...state, isLoading: false };

//   default:
//     return { state };
//   }
// };

const reducerWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.expense),
    };
  default:
    return state;
  }
};

export default reducerWallet;
