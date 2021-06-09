import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import SavedURLs from './Admin/SavedURLs';
import UpdateModal from './Admin/UpdateModal';
import PostModal from './Admin/PostModal';
import PostBtn from './Admin/PostBtn';
import Loader from './common/Loader';

import { HandleMsgToast } from '../App';
import { setErrorMsg } from '../utils';
import { BASE_URL } from '../constants';

const initUpdateValues = { shortURL: '', longURL: '' };

function Admin() {
  const [URLs, setURLs] = useState([]);
  const [updateValues, setUpdateValues] = useState(initUpdateValues);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isPostModal, setIsPostModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setMsg } = useContext(HandleMsgToast);

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/`);
        setURLs(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
        setMsg(setErrorMsg(err));
      }
    };
    init();
  }, []);

  return (
    <Container>
      <header className='text-center'>
        <h1>Bitly</h1>
      </header>

      {isLoading ? (
        <Loader />
      ) : (
        <SavedURLs URLs={URLs} setIsLoading={setIsLoading} setUpdateValues={setUpdateValues} setIsUpdateModal={setIsUpdateModal} />
      )}

      <PostBtn setIsPostModal={setIsPostModal} />

      <UpdateModal
        updateValues={updateValues}
        isUpdateModal={isUpdateModal}
        setIsUpdateModal={setIsUpdateModal}
        setURLs={setURLs}
      />

      <PostModal isPostModal={isPostModal} setIsPostModal={setIsPostModal} setURLs={setURLs} />
    </Container>
  );
}

export default Admin;
