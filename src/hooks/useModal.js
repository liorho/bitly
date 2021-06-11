import { useState, useEffect } from 'react';

function useModal(props) {
  const { setModal, initInputs } = props;
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState(initInputs);

  const handleClose = () => {
    setModal({ isModal: false });
  };

  useEffect(() => {
    return () => {
      setErrors({});
      setInputs({});
    };
  }, []);

  const handleChange = (e) => {
    setInputs((inputs) => {
      return { ...inputs, [e.target.name]: e.target.value };
    });
    if (!!errors[e.target.name])
      setErrors((errors) => {
        return { ...errors, [e.target.name]: null };
      });
  };

  return { errors, setErrors, inputs, setInputs, handleChange, handleClose };
}

export default useModal;
