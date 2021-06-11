import * as api from './api';

export const getURLs = async () => {
  const response = {};
  try {
    const { data } = await api.getURLs();
    response.data = data;
  } catch (err) {
    console.error(err);
    response.error = err;
  }
  return response;
};

export const updateURL = async (shortURL, newShortURL) => {
  const response = {};
  try {
    await api.updateURL(shortURL, newShortURL);
    response.success = true;
  } catch (err) {
    console.error(err);
    response.error = err.response ? { newShortURL: err } : { general: err };
  }
  return response;
};

export const postURL = async (newURL) => {
  const response = {};
  try {
    await api.postURL(newURL);
    response.success = true;
  } catch (err) {
    console.error(err);
    response.error = err.response ? { shortURL: err } : { general: err };
  }
  return response;
};

export const deleteURL = async (shortURL) => {
  const response = {};
  try {
    await api.deleteURL(shortURL);
    response.success = true;
  } catch (err) {
    console.error(err);
    response.error = err;
  }
  return response;
};
