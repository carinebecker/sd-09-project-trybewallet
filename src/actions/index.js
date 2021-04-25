export const GET_USER_EMAIL = 'GET_USER_EMAIL';

export const getUserEmail = (email) => ({
  type: GET_USER_EMAIL,
  userEmail: email,
});

export const PREPEND_EXPENSES = 'PREPEND_EXPENSES';

export const prependExpenses = (data) => ({
  type: PREPEND_EXPENSES,
  expense: data,
});

// export const APPEND_EXPENSES = 'APPEND_EXPENSES';

// export const appendExpenses = (data) => ({
//   type: APPEND_EXPENSES,
//   expenses: data,
// });
