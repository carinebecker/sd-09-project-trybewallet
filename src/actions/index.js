export const SAVE_EMAIL = 'SAVE_EMAIL';
export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const SAVE_FORMS = 'SAVE_FORM';
export const saveForms = (state, exchange) => ({
  type: SAVE_FORMS,
  state,
  exchange,

});

export const saveFormsThunk = (state) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchange = await response.json();
  return dispatch(saveForms(state, exchange));
};
