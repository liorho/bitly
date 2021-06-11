import React, { useContext } from 'react';
import shortID from 'shortid';
import validURL from 'valid-url';

import { HandleMsgToast } from '../../../App';
import { setErrorMsg } from '../../../utils';
import { MODAL_ERRORS } from '../../../constants';

import ModalService from './ModalService/ModalService';

import * as request from '../../../api';

import useModal from '../../../hooks/useModal';

const initPostInputs = { shortURL: '', longURL: '' };

function PostModal(props) {
  const { modal, setModal, setURLs } = props;
  const { errors, setErrors, inputs, setInputs, handleChange, handleClose } = useModal({ setModal, initInputs: initPostInputs });
  const { setMsg } = useContext(HandleMsgToast);

  const findErrors = () => {
    const newErrors = {};
    const { longURL, shortURL } = inputs;
    if (!longURL) newErrors.longURL = MODAL_ERRORS.BLANK;
    if (!shortURL) newErrors.shortURL = MODAL_ERRORS.BLANK;
    if (longURL && !validURL.isUri(longURL)) newErrors.longURL = MODAL_ERRORS.INVALID_URL;
    return newErrors;
  };

  const postURL = async () => {
    const { longURL, shortURL } = inputs;
    const newURL = { longURL, shortURL, date: new Date(), counter: 0 };
    const response = await request.postURL(newURL);
    if (response.success) {
      setURLs((URLs) => [newURL, ...URLs]);
      setMsg(`Added new URL`);
      handleClose();
    } else if (response.error.shortURL) {
      setErrors((errors) => {
        return { ...errors, shortURL: setErrorMsg(response.error.shortURL) };
      });
    } else {
      setMsg(setErrorMsg(response.error.general));
    }
  };

  const createShortURL = () =>
    setInputs((inputs) => {
      return { ...inputs, shortURL: shortID() };
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      postURL();
    }
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSubmit(e);

  const inputsParams = [
    { lg: 2, label: 'Long URL:', name: 'longURL', placeholder: 'e.g. https://www.linkly.com', inputs, errors, handleChange, handleKeyPress },
    { lg: 2, label: 'Short URL:', name: 'shortURL', placeholder: 'e.g. linkly', inputs, errors, handleChange, handleKeyPress },
  ];
  const buttonsParams = [
    { variant: 'light', text: 'Random Short URL', operation: createShortURL },
    { variant: 'success', text: 'Save', operation: handleSubmit },
  ];

  return <ModalService title='Add a New URL' modal={modal} handleClose={handleClose} inputsParams={inputsParams} buttonsParams={buttonsParams} />;
}

export default PostModal;
