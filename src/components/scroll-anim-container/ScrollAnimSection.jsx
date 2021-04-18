import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScrollAnimSection.css';

import { useSpring, animated, config } from 'react-spring';
import Button from 'react-bootstrap/Button';
import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsChevronCompactLeft,
  BsChevronCompactRight,
} from 'react-icons/bs';

const ScrollAnimSection = ({
  content,
  onNext,
  onPrev,
  visible,
  scrollable,
  showUpButton,
  showDownButton,
  showLeftButton,
  showRightButton,
  horizontal,
}) => {
  const [showSection, setShowSection] = useState(visible);
  const [renderSection, setRenderSection] = useState(visible);
  const [scrollEnabled, setScrollEnabled] = useState(scrollable);
  const [amount] = useState(horizontal ? 1200 : 800);

  // state to control the sections moving up and down
  const [translate, setTranslate] = useState(visible ? 0 : amount);

  const moveSectionPos = () => {
    setTranslate((t) => Math.max(t - amount, -amount));
  };

  const moveSectionNeg = () => {
    setTranslate((t) => Math.min(t + amount, amount));
  };

  // allows parent to show this component
  // currently you can only hide this element from within itself
  useEffect(() => {
    if (visible) {
      // if visible is set to true
      setShowSection(true);
      setRenderSection(true);
      if (translate > 0) {
        moveSectionPos();
      } else if (translate < 0) {
        moveSectionNeg();
      }
    }
  }, [visible]);

  // this function is called when we want to move on to the next section
  // after a button press or some other trigger
  const nextSection = () => {
    moveSectionPos();
    setShowSection(false);
    onNext();
  };

  const prevSection = () => {
    moveSectionNeg();
    setShowSection(false);
    onPrev();
  };

  // checks whether current scroll is at the bottom of the given element
  const isAtElementBottom = (element) => {
    return element.scrollHeight - element.scrollTop === element.clientHeight;
  };

  const onPageScroll = (e) => {
    const element = e.target;
    // check if reached bottom of this component and scrolling down
    if (isAtElementBottom(element) && e.deltaY > 0) {
      if (scrollEnabled && !horizontal) {
        // trigger a focus on the down button
        nextSection();
      }
    }
  };

  // animation that shrinks/exapands this element.
  const sectionAnim = useSpring({
    transform: horizontal
      ? `translateX(${translate}px)`
      : `translateY(${translate}px)`,
    opacity: showSection ? 1 : 0,
    config: config.molasses,
    display: renderSection ? 'flex' : 'none',
    onRest: () => {
      // After the animation is done, if the element is currently not showing,
      // set display of the this section to none
      if (!showSection && renderSection) {
        setRenderSection(false);
      }
    },
  });

  return (
    <animated.div className="scroll-anim-section" style={sectionAnim}>
      <div className="scroll-anim-section-content" onWheel={onPageScroll}>
        {React.cloneElement(content, {
          enableScroll: () => setScrollEnabled(true),
          moveNext: { nextSection },
          movePrev: { prevSection },
        })}
        {showUpButton && !horizontal && (
          <div className="up-div">
            <Button variant="dark" className="nav-button" onClick={prevSection}>
              <BsChevronCompactUp size="2em" />
            </Button>
          </div>
        )}
        {showDownButton && !horizontal && (
          <div className="down-div">
            <Button variant="dark" className="nav-button" onClick={nextSection}>
              <BsChevronCompactDown size="2em" />
            </Button>
          </div>
        )}
        {showLeftButton && horizontal && (
          <div className="left-div">
            <Button variant="dark" className="nav-button" onClick={prevSection}>
              <BsChevronCompactLeft size="2em" />
            </Button>
          </div>
        )}
        {showRightButton && horizontal && (
          <div className="right-div">
            <Button variant="dark" className="nav-button" onClick={nextSection}>
              <BsChevronCompactRight size="2em" />
            </Button>
          </div>
        )}
      </div>
    </animated.div>
  );
};

ScrollAnimSection.propTypes = {
  content: PropTypes.element,
  onNext: PropTypes.func, // callback after moving to the next section
  onPrev: PropTypes.func, // callback after moving to the prev section
  visible: PropTypes.bool,
  scrollable: PropTypes.bool, // set true to be able to scroll to next
  showUpButton: PropTypes.bool, // set true to show the up button
  showDownButton: PropTypes.bool, // set true to show the down button
  showLeftButton: PropTypes.bool, // set true to show the left button
  showRightButton: PropTypes.bool, // set true to show the right button
  horizontal: PropTypes.bool, // set true if you want to move horizontntally instead of vertically
};

ScrollAnimSection.defaultProps = {
  content: (
    <div>
      {' '}
      <p>This is a section</p>{' '}
    </div>
  ),
  onNext: () => {},
  onPrev: () => {},
  visible: true,
  scrollable: false,
  showDownButton: true,
  showUpButton: true,
  showLeftButton: true,
  showRightButton: true,
  horizontal: false,
};

export default ScrollAnimSection;
