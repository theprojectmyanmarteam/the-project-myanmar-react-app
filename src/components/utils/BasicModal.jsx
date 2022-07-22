/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './BasicModal.css';
import TextContainer from './text-container/TextContainer';

const BasicModal = ({ title, content, references, show, setShow }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShow(false);
    }
  };

  return (
    show &&
    ReactDom.createPortal(
      <div className="container">
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className="basic-modal-container"
          ref={modalRef}
          onClick={closeModal}
        >
          <div className="modal">
            <div className="basic-modal-content">
              <div className="basic-modal-header">
                <div className="basic-modal-title">{title}</div>
                <button type="button" onClick={() => setShow(false)}>
                  X
                </button>
              </div>
              <TextContainer description={content} references={references} />
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('portal')
    )
  );
};

BasicModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  show: PropTypes.bool,
  //   onHide: PropTypes.func,
};

BasicModal.defaultProps = {
  title: 'Title',
  content: 'This is a sample text.',
  show: false,
  //   onHide: () => {},
};

export default BasicModal;
