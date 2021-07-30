import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EventModal.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { truncate } from 'lodash';

const EventModal = ({ title, content, show, onHide }) => {
  const [readMore, setReadMore] = useState(false); // true = content is shown; false = content is collapsed

  let body;

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  if (Array.isArray(content)) {
    const contentList = content.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={`item-${index}`}>{item}</li>
    ));
    const hiddenContentList = content.slice(0, 2).map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={`item-${index}`}>{item}</li>
    ));
    body = (
      <div>
        <ul>{readMore ? contentList : hiddenContentList}</ul>
        {/* only enable 'read more' functionality if array length is greater than 2 */}
        {content.length > 2 && (
          <span
            onClick={toggleReadMore}
            onKeyDown={toggleReadMore}
            role="button"
            tabIndex={0}
            className="read-or-hide"
          >
            {readMore ? '...show less' : '...read more'}
          </span>
        )}
      </div>
    );
  } else {
    body = (
      <div>
        <p>
          {readMore
            ? content
            : truncate(content, { length: 150, separator: ' ' })}
        </p>
        {/* only enable 'read more' functionality if string length is greater than 150 */}
        {content.length > 150 && (
          <span
            onClick={toggleReadMore}
            onKeyDown={toggleReadMore}
            role="button"
            tabIndex={0}
            className="read-or-hide"
          >
            {readMore ? '...show less' : '...read more'}
          </span>
        )}
      </div>
    );
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

EventModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
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
