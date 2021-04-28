export const EMAIL_SAVE = 'EMAIL_SAVE';

export function emailSave(email) {
  return { type: EMAIL_SAVE, email };
}
