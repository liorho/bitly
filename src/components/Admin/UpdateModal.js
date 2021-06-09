import React, { useState, useContext, useEffect, useRef } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import axios from 'axios';

import { BASE_URL } from '../../constants';
import { HandleMsgToast } from '../../App';
import { setErrorMsg } from '../../utils';

function UpdateModal(props) {
  const { updateValues, isUpdateModal, setIsUpdateModal, setURLs } = props;
  const { setMsg } = useContext(HandleMsgToast);
  const [errors, setErrors] = useState({});
  const [newShortURL, setNewShortURL] = useState('');
  const newShortURLRef = useRef(null);

  useEffect(() => newShortURLRef.current?.focus());

  const handleClose = () => {
    setIsUpdateModal(false);
    setErrors({});
  };

  const handleUpdateInput = (e) => {
    setNewShortURL(e.target.value);
    if (!!errors.newShortURL) setErrors({ newShortURL: null });
  };

  const findFormErrors = () => {
    const { shortURL } = updateValues;
    const newErrors = {};
    if (!newShortURL) newErrors.newShortURL = 'Cannot Be Blank!';
    if (newShortURL === shortURL) newErrors.newShortURL = 'The new Short URL is the same as the old one! Pick a different Short URL';
    return newErrors;
  };

  const updateURL = async () => {
    const { shortURL } = updateValues;
    try {
      await axios.put(`${BASE_URL}/api/${shortURL}`, { newShortURL });
      setURLs((URLs) =>
        URLs.map((URL) => {
          return { ...URL, shortURL: URL.shortURL === shortURL ? newShortURL : URL.shortURL };
        })
      );
      setIsUpdateModal(false);
      setMsg(`The Short URL "${shortURL}" was changed to "${newShortURL}"`);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErrors({ newShortURL: setErrorMsg(err) });
      } else {
        setMsg(setErrorMsg(err));
      }
    }
  };

  const deleteURL = async () => {
    const { shortURL } = updateValues;
    try {
      await axios.delete(`${BASE_URL}/api/${shortURL}`);
      setURLs((URLs) => URLs.filter((URL) => URL.shortURL !== shortURL));
      setMsg(`The Short URL "${shortURL}" was deleted`);
    } catch (err) {
      console.error(err);
      setMsg(setErrorMsg(err));
    } finally {
      setIsUpdateModal(false);
    }
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSubmit(e);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      updateURL();
    }
  };

  return (
    <Modal size='lg' show={isUpdateModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{updateValues.longURL}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Row className='mb-2'>
              <Form.Label column lg={4}>
                Enter a New Short URL:
              </Form.Label>
              <Col>
                <Form.Control
                  name='newShortURL'
                  type='text'
                  placeholder={updateValues.shortURL}
                  onChange={handleUpdateInput}
                  value={updateValues.newShortURL}
                  onKeyPress={handleKeyPress}
                  isInvalid={!!errors.newShortURL}
                  ref={newShortURLRef}
                />
                <Form.Control.Feedback type='invalid'>{errors.newShortURL}</Form.Control.Feedback>
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='secondary' type='submit' onClick={deleteURL}>
          Delete URL
        </Button>
        <Button variant='success' type='submit' onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
