import { USER_DATA } from '../reducers/user';
import { WALLET_INFO,
  MONEY_INFO,
  REQUEST_MONEY, DELETE_EXPENSE, EDIT_EXPENSE, EDITED_EXPENSE } from '../reducers/wallet';
import moneyData from '../services/api';

const userLogin = (email) => ({
  type: USER_DATA,
  email,
});

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});

export const editingExpense = (item) => ({
  type: EDIT_EXPENSE,
  isEditing: true,
  item,
});

export const editedExpense = (expenses) => ({
  type: EDITED_EXPENSE,
  expenses,
});

export const walletUpdate = (expenses) => ({
  type: WALLET_INFO,
  expenses,
});

const requestMoney = () => ({
  type: REQUEST_MONEY,
  isFetching: true,
});

const sendMoneyInfo = (money) => ({
  type: MONEY_INFO,
  money,
  isFetching: false,
});

export function getMoneyInfo() {
  return (dispatch) => {
    dispatch(requestMoney());
    moneyData().then((response) => Object.keys(response).filter((e) => e !== 'USDT'))
      .then((response) => dispatch(sendMoneyInfo(response)));
  };
}

export default userLogin;
