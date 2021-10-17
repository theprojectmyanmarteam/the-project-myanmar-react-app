import React from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';
import ScrollAnimContainer from '../scroll-anim-container/ScrollAnimContainer';
import ScrollAnimItem from '../scroll-anim-container/ScrollAnimItem';
import QuizQuestion from './QuizQuestion';
import QuizTryAgain from './QuizTryAgain';

const Quiz = ({ controllers }) => {
  return (
    <div className="quiz-container">
      <ScrollAnimContainer horizontal>
        <ScrollAnimItem
          content={<QuizQuestion onRightAnswer={controllers.showNext} />}
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

Quiz.propTypes = {
  controllers: PropTypes.shape({
    moveNext: PropTypes.func,
    showNext: PropTypes.func,
  }),
};

Quiz.defaultProps = {
  controllers: {},
};

export default Quiz;
