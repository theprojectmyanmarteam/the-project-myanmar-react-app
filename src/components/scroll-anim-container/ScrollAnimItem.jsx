import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ScrollAnimItem.css';

import { useSpring, animated, config } from 'react-spring';

import Button from 'react-bootstrap/Button';
import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsChevronCompactLeft,
  BsChevronCompactRight,
} from 'react-icons/bs';

const SHOW_BUTTON_DELAY_MS = 800;

const ScrollAnimItem = ({
  content,
  nextButton,
  prevButton,
  moveNext,
  movePrev,
  horizontal,
  shown,
}) => {
  const [nextScrollEnabled, setNextScrollEnabled] = useState(
    nextButton.scrollable
  );
  // eslint-disable-next-line no-unused-vars
  const [prevScrollEnabled, setPrevScrollEnabled] = useState(
    prevButton.scrollable
  );
  const [showNext, setShowNext] = useState(nextButton.show);
  const [showPrev, setShowPrev] = useState(prevButton.show);

  // animation for next button
  // -> fade in
  const nextButtonAnim = useSpring({
    opacity: showNext ? 1 : 0,
    delay: showNext ? SHOW_BUTTON_DELAY_MS : 0,
    config: config.molasses,
    onRest: () => setNextScrollEnabled(true),
  });

  // animation for prev button
  // -> fade in
  const prevButtonAnim = useSpring({
    opacity: showPrev ? 1 : 0,
    delay: showPrev ? SHOW_BUTTON_DELAY_MS : 0,
    config: config.molasses,
    onRest: () => setPrevScrollEnabled(true),
  });

  // checks whether current scroll is at the bottom of the given element
  const isAtElementBottom = (element) => {
    return element.scrollHeight - element.scrollTop === element.clientHeight;
  };

  const onPageScroll = (e) => {
    const element = e.target;
    // check if reached bottom of this component and scrolling down
    if (isAtElementBottom(element) && e.deltaY > 0) {
      if (nextScrollEnabled && !horizontal) {
        moveNext();
      }
    }
    // allow to scroll back to the top; not allowing left scroll
    else if (prevScrollEnabled && !horizontal) {
      movePrev();
    }
  };

  return (
    <div className="scroll-anim-item" onWheel={onPageScroll}>
      {React.cloneElement(content, {
        controllers: {
          enableScroll: () => setNextScrollEnabled(true),
          moveNext,
          showNext: () => setShowNext(true),
          movePrev,
          showPrev: () => setShowPrev(true),
          // shown,
        },
        shown,
      })}
      {showPrev && !horizontal && (
        <animated.div className="up-div" style={prevButtonAnim}>
          <Button variant="dark" className="nav-button" onClick={movePrev}>
            <BsChevronCompactUp size="2em" />
          </Button>
          <p className="up-text">{prevButton.label}</p>
        </animated.div>
      )}
      {showNext && !horizontal && (
        <animated.div className="down-div" style={nextButtonAnim}>
          <p className="down-text">{nextButton.label}</p>
          <Button variant="dark" className="nav-button" onClick={moveNext}>
            <BsChevronCompactDown size="2em" />
          </Button>
        </animated.div>
      )}
      {showPrev && horizontal && (
        <animated.div className="left-div" style={prevButtonAnim}>
          <Button variant="dark" className="nav-button" onClick={movePrev}>
            <BsChevronCompactLeft size="2em" />
          </Button>
          <div className="left-text">{prevButton.label}</div>
        </animated.div>
      )}
      {showNext && horizontal && (
        <animated.div className="right-div style={nextButtonAnim}">
          <div className="right-text">{nextButton.label}</div>
          <Button variant="dark" className="nav-button" onClick={moveNext}>
            <BsChevronCompactRight size="2em" />
          </Button>
        </animated.div>
      )}
    </div>
  );
};

ScrollAnimItem.propTypes = {
  content: PropTypes.element,
  nextButton: PropTypes.shape({
    show: PropTypes.bool, // set to false to hide this button
    label: PropTypes.string, // put a label next to the button
    scrollable: PropTypes.bool, // can be triggered by scroll
  }),
  prevButton: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string,
    scrollable: PropTypes.bool,
  }),
  moveNext: PropTypes.func,
  movePrev: PropTypes.func,
  horizontal: PropTypes.bool, // orientation of the buttons
  shown: PropTypes.bool, // true if this current element is shown
};

ScrollAnimItem.defaultProps = {
  content: (
    <div>
      {' '}
      <p>This is a section</p>{' '}
    </div>
  ),
  nextButton: {
    show: true,
    label: '',
    scrollable: false,
  },
  prevButton: {
    show: true,
    label: '',
    scrollable: false,
  },
  moveNext: () => {},
  movePrev: () => {},
  horizontal: false,
  shown: false,
};

export default ScrollAnimItem;
