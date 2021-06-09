import { useState, useEffect } from 'react';

const { MSG_TIMER } = require('../../constants');

function useMsg() {
  const [msg, setMsg] = useState('');
  const [isMsg, setIsMsg] = useState(false);
  useEffect(() => {
    if (msg) {
      setMsg(msg);
      setIsMsg(true);
      setTimeout(() => {
        setIsMsg(false);
        setMsg('');
      }, MSG_TIMER);
    }
  }, [msg]);

  return [{ isMsg, msg }, setMsg];
}

export default useMsg;
