import axios from 'axios';
import { BASE_URL } from '../constants';

export const getURLs = async () => axios.get(`${BASE_URL}/api/`);
export const updateURL = async (shortURL, newShortURL) => axios.put(`${BASE_URL}/api/${shortURL}`, { newShortURL });
export const deleteURL = async (shortURL) => axios.delete(`${BASE_URL}/api/${shortURL}`);
export const postURL = async (newURL) => axios.post(`${BASE_URL}/api/`, newURL);
