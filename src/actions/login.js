// Coloque aqui suas actions
export const GET__EMAIL = 'GET_EMAIL';

const updateEmail = (email) => ({
  type: GET__EMAIL,
  email,
});

export default updateEmail;
