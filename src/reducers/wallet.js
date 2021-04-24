// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import React from 'react';
// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  REQUEST_CURRENCY_DATA,
  RECEIVE_CURRENCY_DATA_SUCCESS,
  RECEIVE_CURRENCY_DATA_FAILURE,
  SAVE_EXPENSE_DATA,
  // GET_EXPENSE_DATA,
} from '../actions/actionTypes';

const INITIAL_CURRENCY_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    isFetching: false,
  },
};

const wallet = (state = INITIAL_CURRENCY_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY_DATA:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCY_DATA_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case RECEIVE_CURRENCY_DATA_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case SAVE_EXPENSE_DATA:
    return {
      ...state,
      expenses: action.expenses,
    };
  /* case GET_EXPENSE_DATA:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    }; */
  default:
    return state;
  }
};

export default wallet;
