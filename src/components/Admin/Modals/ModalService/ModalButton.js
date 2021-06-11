import { Button } from 'react-bootstrap';

const ModalButton = ({ variant, text, operation }) => (
  <Button variant={variant} type='submit' onClick={operation}>
    {text}
  </Button>
);
export default ModalButton;
