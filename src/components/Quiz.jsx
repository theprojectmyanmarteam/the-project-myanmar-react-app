import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';
import Button from 'react-bootstrap/Button';
import { BsX } from 'react-icons/bs';
import { useSpring, animated, config } from 'react-spring';

const Quiz = ({ visible }) => {
  const [showQuestion, setShowQuestion] = useState(true);
  const [renderQuestion, setRenderQuestion] = useState(true);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [renderWrongAnswer, setRenderWrongAnswer] = useState(false);

  // animation for quiz page
  // -> fade in up
  const quizAnim = useSpring({
    opacity: visible ? 1 : 0,
    display: visible ? 'flex' : 'none',
    config: config.slow,
  });

  // animation for question page
  // -> fade out left
  const questionAnim = useSpring({
    width: showQuestion ? '100%' : '0%',
    opacity: showQuestion ? 1 : 0,
    display: renderQuestion ? 'flex' : 'none',
    config: config.molasses,
    onRest: () => {
      if (!showQuestion && renderQuestion) {
        setRenderQuestion(false);
      }
    },
  });

  // animation for question page
  // -> fade out left
  const wrongAnswerAnim = useSpring({
    width: showWrongAnswer ? '100%' : '0%',
    opacity: showWrongAnswer ? 1 : 0,
    display: renderWrongAnswer ? 'flex' : 'none',
    config: config.molasses,
    onRest: () => {
      if (!showWrongAnswer && renderWrongAnswer) {
        setRenderWrongAnswer(false);
      }
    },
  });

  const onWrongAnswer = () => {
    setShowQuestion(false);
    setRenderWrongAnswer(true);
    setShowWrongAnswer(true);
  };

  const onTryAgain = () => {
    setShowQuestion(true);
    setRenderQuestion(true);
    setShowWrongAnswer(false);
  };

  return (
    <animated.div id="quiz-container" style={quizAnim}>
      <animated.div id="quiz-question-container" style={questionAnim}>
        <div id="quiz-question-title" className="h4">
          <p>What is the capital city of Myanmar?</p>
        </div>
        <div id="quiz-answer-container">
          <Button
            variant="outline-light"
            className="quiz-answer-btn"
            onClick={onWrongAnswer}
          >
            Yangon
          </Button>
          <Button
            variant="outline-light"
            className="quiz-answer-btn"
            onClick={onWrongAnswer}
          >
            Mandalay
          </Button>
          <Button variant="outline-light" className="quiz-answer-btn">
            Naypyidaw
          </Button>
        </div>
      </animated.div>
      <animated.div id="quiz-wrong-container" style={wrongAnswerAnim}>
        <div id="quiz-wrong-title">
          <BsX size="1.5em" />
          WRONG.
        </div>
        <div id="quiz-wrong-reason" className="h5">
          <p>
            Mandalay was the last royal capital til 1885. Yangon became the
            capital under the British colonial rule. But, Naypyidaw is the
            current capital of Myanmar.
          </p>
        </div>
        <Button
          id="quiz-try-again-btn"
          variant="outline-light"
          onClick={onTryAgain}
        >
          Try Again?
        </Button>
      </animated.div>
    </animated.div>
  );
};

Quiz.propTypes = {
  visible: PropTypes.bool,
};

Quiz.defaultProps = {
  visible: true,
};

export default Quiz;
