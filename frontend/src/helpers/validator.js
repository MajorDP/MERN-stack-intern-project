const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const MIN_LENGTH = 7;
const MIN_TITLE_LENGTH = 5;

export const isEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const isValidLength = (password) => {
  return password.length >= MIN_LENGTH;
};

export const isValidTitle = (title) => {
  return title.length >= MIN_TITLE_LENGTH;
};

export const validate = (value, validators) => {
  return validators.every((validator) => validator(value));
};
