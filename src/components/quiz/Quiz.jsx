import React from 'react';
import './Quiz.css';
import ScrollAnimContainer from '../scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from '../scroll-anim-container/ScrollAnimItem';
import QuizQuestion from './QuizQuestion';
import QuizTryAgain from './QuizTryAgain';

const Quiz = () => {
  return (
    <div className="quiz-container">
      <ScrollAnimContainer horizontal>
        <ScrollAnimItem
          content={<QuizQuestion />}
          nextButton={{ show: false }}
        />
        <ScrollAnimItem
          content={<QuizTryAgain />}
          prevButton={{ show: false }}
        />
      </ScrollAnimContainer>
    </div>
  );
};

export default Quiz;
