import React from 'react';
import { formatDate } from '../../utils';

function SavedURL(props) {
  const { URL, index, setIsUpdateModal, setUpdateValues } = props;
  const { longURL, shortURL, counter, date } = URL;

  const handleUpdate = () => {
    setIsUpdateModal(true);
    setUpdateValues({ shortURL, longURL });
  };

  return (
    <tr className='cursor-pointer' onClick={handleUpdate}>
      <td>{index + 1}</td>
      <td>{longURL} </td>
      <td>{shortURL} </td>
      <td>{counter} </td>
      <td>{formatDate(date)} </td>
    </tr>
  );
}

export default SavedURL;
