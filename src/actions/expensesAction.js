import { SAVE_EXPENSE_INFO } from './actionTypes';

const saveExpensesInfo = (expenseInfo) => ({ type: SAVE_EXPENSE_INFO, expenseInfo });

export default saveExpensesInfo;
