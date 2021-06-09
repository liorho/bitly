import { Toast } from 'react-bootstrap';

function MsgToast(props) {
  const { isMsg, msg } = props;
  return (
    <Toast className='msg-toast' show={isMsg}>
      <Toast.Header>
        <strong className='mr-auto'>Bitly</strong>
      </Toast.Header>
      <Toast.Body>{msg}</Toast.Body>
    </Toast>
  );
}

export default MsgToast;
