import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import Button from 'react-bootstrap/Button';
import { BsChevronCompactDown } from 'react-icons/bs';

import './Title.css';

import { useSpring, animated, config } from 'react-spring';

const START_TYPING_DELAY_MS = 1500;
const SHOW_BUTTON_DELAY_MS = 800;

const Title = ({ onHide, visible }) => {
  const [showDownButton, setShowDownButton] = useState(false);
  const [downButtonAnimDone, setDownButtonAnimDone] = useState(false);
  const [showTitle, setShowTitle] = useState(visible);
  const [renderTitle, setRenderTitle] = useState(true);

  // allows parent to hide this component by setting visible prop
  useEffect(() => {
    // if hidden
    if (!visible) {
      onHide();
    } else {
      setRenderTitle(true);
    }
    setShowTitle(visible);
  }, [visible]);

  // animation for down button
  // -> fade in
  const downButtonAnim = useSpring({
    opacity: showDownButton ? 1 : 0,
    delay: showDownButton ? SHOW_BUTTON_DELAY_MS : 0,
    config: config.molasses,
    onRest: () => setDownButtonAnimDone(true),
  });

  // animation for title page
  // -> collapse to top
  // -> fade out
  const titleAnim = useSpring({
    height: showTitle ? '100%' : '0%',
    opacity: showTitle ? 1 : 0,
    display: renderTitle ? 'block' : 'none',
    onRest: () => {
      if (!showTitle && renderTitle) {
        setRenderTitle(false);
      }
    },
    config: config.molasses,
  });

  // hides this component and calls the onHide callback function
  const hideTitle = () => {
    setShowTitle(false);
    onHide();
  };

  // checks whether current scroll is at the bottom of the given element
  const isAtElementBottom = (element) => {
    return element.scrollHeight - element.scrollTop === element.clientHeight;
  };

  const onPageScroll = (e) => {
    const element = e.target;
    // check if reached bottom of this component and scrolling down
    if (isAtElementBottom(element) && e.deltaY > 0) {
      if (downButtonAnimDone) {
        // trigger a focus on the down button
        hideTitle();
      }
    }
  };

  const onTypingDone = () => {
    setShowDownButton(true);
  };

  return (
    <animated.div id="splash-container" style={titleAnim}>
      <div id="splash-content" onWheel={onPageScroll}>
        <Typist
          startDelay={START_TYPING_DELAY_MS}
          className="h1 title"
          onTypingDone={onTypingDone}
        >
          The Project Myanmar
        </Typist>
        <animated.div id="down-div" style={downButtonAnim}>
          <p id="down-text">Scroll down to start</p>
          <Button variant="dark" id="down-button" onClick={hideTitle}>
            <BsChevronCompactDown size="2em" />
          </Button>
        </animated.div>
      </div>
    </animated.div>
  );
};

Title.propTypes = {
  onHide: PropTypes.func, // callback after hiding this element
  visible: PropTypes.bool,
};

Title.defaultProps = {
  onHide: () => {},
  visible: true,
};

export default Title;
