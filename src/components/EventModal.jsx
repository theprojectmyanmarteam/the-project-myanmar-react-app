import React from 'react';
import PropTypes from 'prop-types';
import './EventModal.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EventModal = ({ title, content, show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        {/* <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
        <p>{content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

EventModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

EventModal.defaultProps = {
  title: 'Event Modal Heading',
  content:
    'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
  show: false,
  onHide: () => {},
};
export default EventModal;
