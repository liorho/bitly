import React, { useContext } from 'react';
import { HandleMsgToast } from '../../../App';
import { setErrorMsg } from '../../../utils';
import { MODAL_ERRORS } from '../../../constants';

import ModalService from './ModalService/ModalService';

import * as request from '../../../api';

import useModal from '../../../hooks/useModal';

const initUpdateInputs = { newShortURL: '' };

function UpdateModal(props) {
  const { updateValues, modal, setModal, setURLs } = props;
  const { errors, setErrors, inputs, handleChange, handleClose } = useModal({ setModal, initInputs: initUpdateInputs });
  const { setMsg } = useContext(HandleMsgToast);

  const findErrors = () => {
    const newErrors = {};
    const { shortURL } = updateValues;
    if (!inputs.newShortURL) newErrors.newShortURL = MODAL_ERRORS.BLANK;
    if (inputs.newShortURL === shortURL) newErrors.newShortURL = MODAL_ERRORS.SAME_SHORT_URL;
    return newErrors;
  };

  const updateURL = async () => {
    const { shortURL } = updateValues;
    const { newShortURL } = inputs;
    const response = await request.updateURL(shortURL, newShortURL);
    if (response.success) {
      setURLs((URLs) =>
        URLs.map((URL) => {
          return { ...URL, shortURL: URL.shortURL === shortURL ? newShortURL : URL.shortURL };
        })
      );
      setMsg(`The Short URL "${shortURL}" was changed to "${newShortURL}"`);
      handleClose();
    } else if (response.error.newShortURL) {
      setErrors({ newShortURL: setErrorMsg(response.error.newShortURL) });
    } else {
      setMsg(setErrorMsg(response.error.general));
    }
  };

  const deleteURL = async () => {
    const { shortURL } = updateValues;
    const response = await request.deleteURL(shortURL);
    if (response.success) {
      setURLs((URLs) => URLs.filter((URL) => URL.shortURL !== shortURL));
      setMsg(`The Short URL "${shortURL}" was deleted`);
    } else {
      setMsg(setErrorMsg(response.error));
    }
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      updateURL();
    }
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSubmit(e);

  const inputsParams = [
    { lg: 4, label: 'Enter a New Short URL:', name: 'newShortURL', placeholder: updateValues.shortURL, inputs, errors, handleChange, handleKeyPress },
  ];

  const buttonsParams = [
    { variant: 'secondary', text: 'Delete URL', operation: deleteURL },
    { variant: 'success', text: 'Save', operation: handleSubmit },
  ];

  return (
    <ModalService title={updateValues.longURL} modal={modal} handleClose={handleClose} inputsParams={inputsParams} buttonsParams={buttonsParams} />
  );
}

export default UpdateModal;
