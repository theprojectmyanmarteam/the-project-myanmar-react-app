import React from 'react';
import PropTypes from 'prop-types';
import './QuizQuestion.css';
import Button from 'react-bootstrap/Button';

const QuizQuestion = ({ controllers, onRightAnswer }) => {
  return (
    <div className="quiz-question-container">
      <div className="quiz-question-title h4">
        <p>What is the capital city of Myanmar?</p>
      </div>
      <div className="quiz-answer-container">
        <Button
          variant="outline-light"
          className="quiz-answer-btn"
          onClick={controllers.moveNext}
        >
          Yangon
        </Button>
        <Button
          variant="outline-light"
          className="quiz-answer-btn"
          onClick={controllers.moveNext}
        >
          Mandalay
        </Button>
        <Button
          variant="outline-light"
          className="quiz-answer-btn"
          onClick={onRightAnswer}
        >
          Naypyidaw
        </Button>
      </div>
    </div>
  );
};

QuizQuestion.propTypes = {
  // functions that can be called to control the ScrollAnimSection that this element is in
  controllers: PropTypes.shape({
    enableScroll: PropTypes.func,
    moveNext: PropTypes.func,
    movePrev: PropTypes.func,
  }),
  onRightAnswer: PropTypes.func, // function called on right answer
};

QuizQuestion.defaultProps = {
  controllers: {},
  onRightAnswer: () => {},
};

export default QuizQuestion;
