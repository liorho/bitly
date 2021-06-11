import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import Loader from './common/Loader';
import { HandleMsgToast } from '../App';
import { setErrorMsg } from '../utils';

const { BASE_URL } = require('../constants');

function RedirectToURL(props) {
  const [isLoading, setIsLoading] = useState(false);

  const { setMsg } = useContext(HandleMsgToast);

  useEffect(() => {
    const init = async () => {
      const { shortURL } = props.match.params
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/${shortURL}`);
        setIsLoading(false);
        window.location.assign(data.longURL);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
        setMsg(setErrorMsg(err));
      }
    };
    init();
  }, [props.match.params.shortURL]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
          <Container className='h-100 h1 d-flex flex-column justify-content-center'>
          <div>
            <div className='text-center'>Redirect to a Valid Short URL</div>
            <div className='text-center'>Example: <strong>{process.env.NODE_ENV === "development" ? 'http://localhost:4001' : 'https://linkly-app.herokuapp.com'}/redirect/shortURL</strong></div>
          </div>
        </Container>
      )}
    </>
  );
}

export default RedirectToURL;
