import React from 'react';
import { Button } from 'react-bootstrap';

const PostBtn = (props) => (
  <Button variant='light' className='btn-outline-dark post-btn' onClick={() => props.setModal({isModal: true, type: "POST"})}>
    <i className='fa fa-plus' aria-hidden='true'></i>
  </Button>
);

export default PostBtn;
