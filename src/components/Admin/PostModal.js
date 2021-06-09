import React, { useState, useContext, useEffect, useRef } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import axios from 'axios';
import shortID from 'shortid';
import validURL from 'valid-url';

import { BASE_URL } from '../../constants';
import { HandleMsgToast } from '../../App';
import { setErrorMsg } from '../../utils';

const initInputs = { shortURL: '', longURL: '' };

function PostModal(props) {
  const { isPostModal, setIsPostModal, setURLs } = props;
  const { setMsg } = useContext(HandleMsgToast);
  const [inputs, setInputs] = useState(initInputs);
  const [errors, setErrors] = useState({});
  const longURLRef = useRef(null);

  useEffect(() => longURLRef.current?.focus());

  const handleClose = () => {
    setIsPostModal(false);
    setErrors({});
    setInputs(initInputs);
  };

  const handleChange = (e) => {
    setInputs((postURLs) => {
      return { ...postURLs, [e.target.name]: e.target.value };
    });
    if (!!errors[e.target.name])
      setErrors((errors) => {
        return { ...errors, [e.target.name]: null };
      });
  };

  const findFormErrors = () => {
    const { longURL, shortURL } = inputs;
    const newErrors = {};
    if (!longURL) newErrors.longURL = 'Cannot Be Blank!';
    if (!shortURL) newErrors.shortURL = 'Cannot Be Blank!';
    if (longURL && !validURL.isUri(longURL)) newErrors.longURL = "Invalid URL - Make sure to have a valid URL prefix (e.g. 'https://')";
    return newErrors;
  };

  const postURLs = async () => {
    const { longURL, shortURL } = inputs;
    try {
      await axios.post(`${BASE_URL}/api/`, { longURL, shortURL });
      setURLs((URLs) => [{ longURL, shortURL, date: new Date(), counter: 0 }, ...URLs]);
      setInputs(initInputs);
      handleClose();
      setMsg(`Added new URL`);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErrors((errors) => {
          return { ...errors, shortURL: setErrorMsg(err) };
        });
      } else {
        setMsg(setErrorMsg(err));
      }
    }
  };

  const createShortURL = () =>
    setInputs((newURL) => {
      return { ...newURL, shortURL: shortID() };
    });

    const handleKeyPress = (e) => e.key === 'Enter' && handleSubmit(e);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      postURLs();
    }
  };

  return (
    <Modal size='lg' show={isPostModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New URL</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Row className='mb-2'>
              <Form.Label column lg={2}>
                Long URL:
              </Form.Label>
              <Col>
                <Form.Control
                  name='longURL'
                  type='text'
                  placeholder='https://www.bitly.com'
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  value={inputs.longURL}
                  isInvalid={!!errors.longURL}
                  ref={longURLRef}
                />
                <Form.Control.Feedback type='invalid'>{errors.longURL}</Form.Control.Feedback>
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column lg={2}>
                Short URL:
              </Form.Label>
              <Col>
                <Form.Control
                  name='shortURL'
                  type='text'
                  placeholder='bitly'
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  value={inputs.shortURL}
                  isInvalid={!!errors.shortURL}
                />
                <Form.Control.Feedback type='invalid'>{errors.shortURL}</Form.Control.Feedback>
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='light' onClick={createShortURL}>
          Random Short URL
        </Button>
        <Button variant='success' type='submit' onClick={handleSubmit}>
          Save URL
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostModal;
