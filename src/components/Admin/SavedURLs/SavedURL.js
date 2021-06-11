import React from 'react';
import { formatDate } from '../../../utils';

function SavedURL(props) {
  const { URL, index, setModal, setUpdateValues } = props;
  const { longURL, shortURL, counter, date } = URL;

  const handleUpdate = () => {
    setModal({isModal: true, type: "UPDATE"});
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
