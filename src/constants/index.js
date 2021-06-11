export const MSG_TIMER = 6500
export const BASE_URL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_HOST : ``
export const INIT_MODAL = { isModal: false, type: '' };
export const MODAL_ERRORS = {
  BLANK: 'Cannot Be Blank!',
  INVALID_URL: "Invalid URL - Make sure to have a valid URL prefix (e.g. 'https://')",
  SAME_SHORT_URL: 'The new Short URL is the same as the old one! Pick a different Short URL'
}
