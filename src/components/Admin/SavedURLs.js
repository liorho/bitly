import React from 'react';
import { Table } from 'react-bootstrap';

import SavedURL from './SavedURL';

function SavedURLs(props) {
  const { URLs, setUpdateValues, setIsUpdateModal } = props;

  return (
    <Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>Long URL</th>
          <th>Short URL</th>
          <th>Clicks</th>
          <th>Issue Date</th>
        </tr>
      </thead>
      <tbody>
        {URLs?.map((URL, i) => (
          <SavedURL
            key={URL.shortURL}
            URL={URL}
            index={i}
            setIsUpdateModal={setIsUpdateModal}
            setUpdateValues={setUpdateValues} />
        ))}
      </tbody>
    </Table>
  );
}

export default SavedURLs;
