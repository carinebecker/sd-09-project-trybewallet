import { ADD_EXPENSES_INDEX } from './index';

export default function addExpenseIndexAction(newExpenseId) {
  return {
    type: ADD_EXPENSES_INDEX,
    payload: {
      id: newExpenseId,
    },
  };
}
