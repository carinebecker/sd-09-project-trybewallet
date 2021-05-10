export const SAVE_EMAIL = 'SAVE_EMAIL';
export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});
export const SAVE_FORMS = 'SAVE_FORM';
export const saveForms = (expenses) => ({
  type: SAVE_FORMS,
  expenses,
});
