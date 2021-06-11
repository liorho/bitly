import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';

import SavedURLs from './Admin/SavedURLs/SavedURLs';
import PostBtn from './Admin/PostBtn/PostBtn';
import ModalService from './Admin/ModalService/ModalService';
import Loader from './common/Loader';

import { HandleMsgToast } from '../App';
import { setErrorMsg } from '../utils';
import { INIT_MODAL } from '../constants';
import { getURLs } from '../api';

const initUpdateValues = { shortURL: '', longURL: '' };

function Admin() {
  const [URLs, setURLs] = useState([]);
  const [updateValues, setUpdateValues] = useState(initUpdateValues);
  const [modal, setModal] = useState(INIT_MODAL);
  const [isLoading, setIsLoading] = useState(false);
  const { setMsg } = useContext(HandleMsgToast);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const response = await getURLs();
      response.error ? setMsg(setErrorMsg(response.error)) : setURLs(response.data);
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <Container>
      <header className='text-center'>
        <h1>Linkly</h1>
        <h5 className='text-center'>
          Redirect to a URL by navigating to: <strong>{window.location.origin}/redirect/shortURL</strong>
        </h5>
      </header>

      <PostBtn setModal={setModal} />

      {isLoading ? <Loader /> : <SavedURLs URLs={URLs} setIsLoading={setIsLoading} setUpdateValues={setUpdateValues} setModal={setModal} />}

      {modal.isModal && <ModalService modal={modal} setModal={setModal} updateValues={updateValues} setURLs={setURLs} />}
    </Container>
  );
}

export default Admin;
