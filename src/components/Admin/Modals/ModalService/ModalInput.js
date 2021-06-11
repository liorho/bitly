import { Form, Col } from 'react-bootstrap';

const ModalInput = ({ lg, label, name, placeholder, inputs, errors, handleChange, handleKeyPress }) => (
  <Form.Group>
    <Form.Row className='mb-2'>
      <Form.Label column lg={lg}>
        {label}
      </Form.Label>
      <Col>
        <Form.Control
          name={name}
          type='text'
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={inputs[name]}
          isInvalid={!!errors[name]}
        />
        <Form.Control.Feedback type='invalid'>{errors[name]}</Form.Control.Feedback>
      </Col>
    </Form.Row>
  </Form.Group>
);

export default ModalInput;
