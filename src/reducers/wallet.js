// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import React from 'react';
// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  REQUEST_CURRENCY_TYPES,
  RECEIVE_CURRENCY_TYPES_SUCCESS,
  RECEIVE_CURRENCY_TYPES_FAILURE,
  SAVE_EXPENSE_DATA,
  REMOVE_EXPENSE_DATA,
  ENABLE_EDITING,
  UPDATE_EXPENSES,
} from '../actions/actionTypes';

const INITIAL_CURRENCY_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  idToEdit: 0,
  editor: false,
};

const wallet = (state = INITIAL_CURRENCY_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY_TYPES:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCY_TYPES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case RECEIVE_CURRENCY_TYPES_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case ENABLE_EDITING:
    return {
      ...state,
      idToEdit: action.idToEdit,
      editor: true,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      // expenses: action.expenses,
      editor: false,
    };
  case SAVE_EXPENSE_DATA:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_EXPENSE_DATA:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
