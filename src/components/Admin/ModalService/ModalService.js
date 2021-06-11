import React, { useState, useContext, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import shortID from 'shortid';
import validURL from 'valid-url';

import { HandleMsgToast } from '../../../App';
import { setErrorMsg } from '../../../utils';
import { INIT_MODAL, MODAL_ERRORS } from '../../../constants';
import { initInputs } from '../../../utils';

import ModalHeader from './ModalHeader';
import ModalInput from './ModalInput';
import ModalButton from './ModalButton';

import * as request from '../../../api';

function ModalService(props) {
  const { updateValues, modal, setModal, setURLs } = props;
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState(initInputs(modal));
  const { setMsg } = useContext(HandleMsgToast);

  const handleClose = () => {
    setModal(INIT_MODAL);
  };

  useEffect(() => {
    return () => {
      setErrors({});
      setInputs({});
    };
  }, []);

  const handleChange = (e) => {
    setInputs((inputs) => {
      return { ...inputs, [e.target.name]: e.target.value };
    });
    if (!!errors[e.target.name])
      setErrors((errors) => {
        return { ...errors, [e.target.name]: null };
      });
  };

  const findErrors = () => {
    const newErrors = {};
    if (modal.type === 'POST') {
      const { longURL, shortURL } = inputs;
      if (!longURL) newErrors.longURL = MODAL_ERRORS.BLANK;
      if (!shortURL) newErrors.shortURL = MODAL_ERRORS.BLANK;
      if (longURL && !validURL.isUri(longURL)) newErrors.longURL = MODAL_ERRORS.INVALID_URL;
    } else {
      const { shortURL } = updateValues;
      if (!inputs.newShortURL) newErrors.newShortURL = MODAL_ERRORS.BLANK;
      if (inputs.newShortURL === shortURL) newErrors.newShortURL = MODAL_ERRORS.SAME_SHORT_URL;
    }
    return newErrors;
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSubmit(e);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      modal.type === 'POST' ? postURL() : updateURL();
    }
  };

  // Operations:
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

  return (
    <Modal size='lg' show={modal.isModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <ModalHeader text={modal.type === 'POST' ? 'Add a New URL' : updateValues.longURL} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ModalInput
            lg={modal.type === 'POST' ? 2 : 4}
            label={modal.type === 'POST' ? 'Long URL:' : 'Enter a New Short URL:'}
            name={modal.type === 'POST' ? 'longURL' : 'newShortURL'}
            placeholder={modal.type === 'POST' ? 'https://www.linkly.com' : updateValues.shortURL}
            inputs={inputs}
            errors={errors}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
          />
          {modal.type === 'POST' ? (
            <ModalInput
              lg={2}
              label='Short URL:'
              name='shortURL'
              placeholder='linkly'
              inputs={inputs}
              errors={errors}
              handleChange={handleChange}
              handleKeyPress={handleKeyPress}
            />
          ) : (
            ''
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <ModalButton
          variant={modal.type === 'POST' ? 'light' : 'secondary'}
          text={modal.type === 'POST' ? 'Random Short URL' : 'Delete URL'}
          operation={modal.type === 'POST' ? createShortURL : deleteURL}
        />
        <ModalButton variant='success' text='Save' operation={handleSubmit} />
      </Modal.Footer>
    </Modal>
  );
}

export default ModalService;
