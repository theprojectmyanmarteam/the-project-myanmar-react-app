import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import Button from 'react-bootstrap/Button';
import { BsChevronCompactDown } from 'react-icons/bs';

import './Title.css';

import { useSpring, animated, config } from 'react-spring';

const START_TYPING_DELAY_MS = 1500;
const SHOW_BUTTON_DELAY_MS = 800;

const Title = ({ enableScroll }) => {
  const [showDownButton, setShowDownButton] = useState(false);

  // animation for down button
  // -> fade in
  const downButtonAnim = useSpring({
    opacity: showDownButton ? 1 : 0,
    delay: showDownButton ? SHOW_BUTTON_DELAY_MS : 0,
    config: config.molasses,
    onRest: enableScroll,
  });

  const onTypingDone = () => {
    setShowDownButton(true);
  };

  return (
    <div id="splash-content">
      <Typist
        startDelay={START_TYPING_DELAY_MS}
        className="h1 title"
        onTypingDone={onTypingDone}
      >
        The Project Myanmar
      </Typist>
      <animated.div id="down-div" style={downButtonAnim}>
        <p id="down-text">Scroll down to start</p>
        <Button variant="dark" id="down-button">
          <BsChevronCompactDown size="2em" />
        </Button>
      </animated.div>
    </div>
  );
};

Title.propTypes = {
  enableScroll: PropTypes.func, // used to enable scroll in parent (ScrollAnimSection)
};

Title.defaultProps = {
  enableScroll: () => {},
};

export default Title;
