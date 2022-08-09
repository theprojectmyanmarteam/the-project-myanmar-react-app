import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './QuizQuestion.css';
import Button from 'react-bootstrap/Button';
import { BsLock, BsUnlock, BsCheck } from 'react-icons/bs';
import { useSpring, animated, config } from 'react-spring';

const QuizQuestion = ({ controllers, onRightAnswer }) => {
  const [locked, setLocked] = useState(true);

  // animation that moves this element
  const fadeInAnim = useSpring({
    opacity: locked ? 0 : 1,
    config: config.gentle,
    onRest: onRightAnswer,
  });

  const onAnswerClick = () => {
    setLocked(false);
  };

  return (
    <div className="quiz-question-container">
      <div className="quiz-question-title h4">
        <p>What is the capital city of Myanmar?</p>
      </div>
      {locked ? <BsLock size={30} /> : <BsUnlock size={30} />}
      <div className="quiz-answer-container">
        <Button
          variant="outline-light"
          className="quiz-answer-btn"
          onClick={controllers.moveNext}
          disabled={!locked}
        >
          Yangon
        </Button>
        <Button
          variant="outline-light"
          className="quiz-answer-btn"
          onClick={controllers.moveNext}
          disabled={!locked}
        >
          Mandalay
        </Button>
        <Button
          variant="outline-light"
          className="quiz-answer-btn"
          onClick={onAnswerClick}
        >
          Naypyidaw
        </Button>
      </div>
      <animated.div className="quiz-question-confirm h5" style={fadeInAnim}>
        <div className="quiz-correct-text">
          <BsCheck /> CORRECT! <br />
        </div>
        <div>Naypyidaw is the current capital city of Myanmar. </div>
      </animated.div>
    </div>
  );
};

QuizQuestion.propTypes = {
  // functions that can be called to control the ScrollAnimSection that this element is in
  controllers: PropTypes.shape({
    enableScroll: PropTypes.func,
    moveNext: PropTypes.func,
    movePrev: PropTypes.func,
    showNext: PropTypes.func,
  }),
  onRightAnswer: PropTypes.func, // function called on right answer
};

QuizQuestion.defaultProps = {
  controllers: {},
  onRightAnswer: () => {},
};

export default QuizQuestion;
