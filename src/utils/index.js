export const formatDate = (date) => {
  date = new Date(date);
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return date.toLocaleDateString('en-GB');
};

export const setErrorMsg = (err) => err.response ? `Status ${err.response.status}: ${err.response.data}` : `Oops, Something Went Wrong...`

const initPostInputs = { shortURL: '', longURL: '' };
const initUpdateInputs = { newShortURL: '' };
export const initInputs = ({ type }) => type === 'post' ? initPostInputs : initUpdateInputs;