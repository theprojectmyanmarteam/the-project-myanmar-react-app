import React from 'react';
import PropTypes from 'prop-types';
import './QuizTryAgain.css';
import Button from 'react-bootstrap/Button';
import { BsX } from 'react-icons/bs';

const QuizTryAgain = ({ controllers }) => {
  return (
    <div className="quiz-wrong-container">
      <div className="quiz-wrong-title">
        <BsX size="1.5em" />
        WRONG.
      </div>
      <div className="quiz-wrong-reason h5">
        <p>
          Mandalay was the last royal capital til 1885. Yangon became the
          capital under the British colonial rule. But, Naypyidaw is the current
          capital of Myanmar.
        </p>
      </div>
      <Button
        className="quiz-try-again-btn"
        variant="outline-light"
        onClick={controllers.movePrev}
      >
        Try Again?
      </Button>
    </div>
  );
};

QuizTryAgain.propTypes = {
  // functions that can be called to control the ScrollAnimSection that this element is in
  controllers: PropTypes.shape({
    enableScroll: PropTypes.func,
    moveNext: PropTypes.func,
    movePrev: PropTypes.func,
  }),
};

QuizTryAgain.defaultProps = {
  controllers: {},
};

export default QuizTryAgain;
