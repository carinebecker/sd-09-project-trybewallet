import { ENABLE_EDIT } from '../actions/actionsTypes';

const INITIAL_STATE = {
  editing: false,
  elementEdit: [],
};

const enableEditReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ENABLE_EDIT:
    return { ...state, editing: true, elementEdit: action.expenseForEditing };
  default:
    return state;
  }
};

export default enableEditReducer;
