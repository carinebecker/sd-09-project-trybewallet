// Coloque aqui suas actions

export const EMAIL_INSERT = 'EMAIL_INSERT';
export const emailInsert = (email) => ({
  type: EMAIL_INSERT,
  email,
});

export const PASSWORD_INSERT = 'PASSWORD_INSERT';
export const passwordInsert = (password) => ({
  type: PASSWORD_INSERT,
  password,
});
