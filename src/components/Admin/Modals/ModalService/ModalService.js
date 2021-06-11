import { Modal, Form } from 'react-bootstrap';

import ModalInput from './ModalInput';
import ModalButton from './ModalButton';

function ModalService(props) {
  const { handleClose, modal, title, inputsParams, buttonsParams } = props;

  return (
    <Modal size='lg' show={modal.isModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {inputsParams.map(({ lg, label, name, placeholder, inputs, errors, handleChange, handleKeyPress }, i) => (
            <ModalInput
              key={i}
              lg={lg}
              label={label}
              name={name}
              placeholder={placeholder}
              inputs={inputs}
              errors={errors}
              handleChange={handleChange}
              handleKeyPress={handleKeyPress}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        {buttonsParams.map(({ variant, text, operation }, i) => (
          <ModalButton key={i} variant={variant} text={text} operation={operation} />
        ))}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalService;
