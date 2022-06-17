import React from 'react';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';

import Helmet from 'react-helmet';

import './Title.css';

const START_TYPING_DELAY_MS = 1500;

const Title = ({ controllers }) => {
  const onTypingDone = () => {
    controllers.showNext();
  };

  return (
    <div className="title-content">
      <Helmet>
        <title>The Project Myanmar</title>
        <meta name="description" content="The Project Myanmar..." />
      </Helmet>
      <Typist
        startDelay={START_TYPING_DELAY_MS}
        className="h1 title"
        onTypingDone={onTypingDone}
      >
        The Project Myanmar
      </Typist>
    </div>
  );
};

Title.propTypes = {
  // functions that can be called to control the ScrollAnimSection that this element is in
  controllers: PropTypes.shape({
    enableScroll: PropTypes.func,
    moveNext: PropTypes.func,
    showNext: PropTypes.func,
    movePrev: PropTypes.func,
    showPrev: PropTypes.func,
  }),
};

Title.defaultProps = {
  controllers: {},
};

export default Title;
