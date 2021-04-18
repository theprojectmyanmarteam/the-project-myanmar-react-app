import React from 'react';
import './Quiz.css';
import Button from 'react-bootstrap/Button';
import { BsX } from 'react-icons/bs';

import ScrollAnimContainer from './scroll-anim-container/ScrollAnimContainer';

const Quiz = () => {
  return (
    <div id="quiz-container">
      <ScrollAnimContainer horizontal>
        <div id="quiz-question-container">
          <div id="quiz-question-title" className="h4">
            <p>What is the capital city of Myanmar?</p>
          </div>
          <div id="quiz-answer-container">
            <Button
              variant="outline-light"
              className="quiz-answer-btn"
              onClick={() => {}}
            >
              Yangon
            </Button>
            <Button
              variant="outline-light"
              className="quiz-answer-btn"
              onClick={() => {}}
            >
              Mandalay
            </Button>
            <Button variant="outline-light" className="quiz-answer-btn">
              Naypyidaw
            </Button>
          </div>
        </div>
        <div id="quiz-wrong-container">
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
            onClick={() => {}}
          >
            Try Again?
          </Button>
        </div>
      </ScrollAnimContainer>
    </div>
  );
};

export default Quiz;
