const INITIAL_STATE = {
  sequenceId: 0,
  editingItem: false,
};

const expenseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_SEQUENCE_ID':
    return {
      ...state,
      sequenceId: state.sequenceId + 1,
    };
  case 'EDITING_ITEM':
    return {
      ...state,
      editingItem: !state.editingItem,
    };
  default:
    return state;
  }
};

export default expenseReducer;
