import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScrollAnimSection.css';

import { useSpring, animated, config } from 'react-spring';

import ScrollAnimItem from './ScrollAnimItem';

const ScrollAnimSection = ({
  item,
  onNext,
  onPrev,
  position,
  horizontal,
  first,
  last,
  setNextButtonConfig,
  setPrevButtonConfig,
  setName,
  onAnimStart,
  onAnimEnd,
}) => {
  const [showSection, setShowSection] = useState(position === 0);
  const [renderSection, setRenderSection] = useState(position === 0);
  const [amount] = useState(horizontal ? 900 : 780);

  // state to control the sections moving up and down
  const [translate, setTranslate] = useState(position * amount);

  const moveSectionPos = () => {
    setTranslate((t) => Math.max(t - amount, -amount));
  };

  const moveSectionNeg = () => {
    setTranslate((t) => Math.min(t + amount, amount));
  };

  useEffect(() => {
    if (position === 0) {
      // if visible is set to true
      setShowSection(true);
      setRenderSection(true);
      if (translate > 0) {
        moveSectionPos();
      } else if (translate < 0) {
        moveSectionNeg();
      }
    } else if (position < 0) {
      if (translate === 0) {
        moveSectionPos();
        setShowSection(false);
        setRenderSection(false);
      } else if (translate > 0) {
        moveSectionPos();
        moveSectionPos();
        setShowSection(false);
        setRenderSection(false);
      }
    } else if (translate === 0) {
      moveSectionNeg();
      setShowSection(false);
      setRenderSection(false);
    } else if (translate < 0) {
      moveSectionNeg();
      moveSectionNeg();
      setShowSection(false);
      setRenderSection(false);
    }
  }, [position]);

  // this function is called when we want to move on to the next section
  // after a button press or some other trigger
  const nextSection = () => {
    onNext();
    moveSectionPos();
    setShowSection(false);
  };

  const prevSection = () => {
    onPrev();
    moveSectionNeg();
    setShowSection(false);
  };

  // animation that moves this element
  const sectionAnim = useSpring({
    transform: horizontal
      ? `translateX(${translate}px)`
      : `translateY(${translate}px)`,
    opacity: showSection ? 1 : 0,
    config: config.slow,
    // uncomment to render only on show
    // display: renderSection ? 'flex' : 'none',
    onRest: () => {
      // After the animation is done, if the element is currently not showing,
      // set display of the this section to none
      if (!showSection && renderSection) {
        setRenderSection(false);
      }
      onAnimEnd();
    },
    onStart: onAnimStart,
  });

  const passedProps = () => {
    const props = {
      moveNext: nextSection,
      movePrev: prevSection,
      horizontal,
      shown: showSection,
      setNextButtonConfig,
      setPrevButtonConfig,
      setName,
    };
    if (first) {
      props.prevButton = { show: false };
    }
    if (last) {
      props.nextButton = { show: false };
    }
    return props;
  };

  return (
    <animated.div className="scroll-anim-section" style={sectionAnim}>
      {React.cloneElement(item, passedProps())}
    </animated.div>
  );
};

ScrollAnimSection.propTypes = {
  item: PropTypes.element,
  onNext: PropTypes.func, // callback after moving to the next section
  onPrev: PropTypes.func, // callback after moving to the prev section
  position: PropTypes.number, // numerical value of this sections current position -> -1: back, 0: center (currently shown), 1: front
  horizontal: PropTypes.bool, // set true if you want to move horizontntally instead of vertically
  // props to indicate whether the current element is the first/last of the scroll container
  first: PropTypes.bool,
  last: PropTypes.bool,
  setNextButtonConfig: PropTypes.func, // use to control visibility of next button
  setPrevButtonConfig: PropTypes.func, // use to control visibility of prev button
  setName: PropTypes.func, // use to set the name of the this section
  onAnimStart: PropTypes.func,
  onAnimEnd: PropTypes.func,
};

ScrollAnimSection.defaultProps = {
  item: (
    <ScrollAnimItem>
      <div>
        {' '}
        <p>This is a section</p>{' '}
      </div>
    </ScrollAnimItem>
  ),
  onNext: () => {},
  onPrev: () => {},
  position: 0,
  horizontal: false,
  first: false,
  last: false,
  setNextButtonConfig: () => {}, // use to control visibility of next button
  setPrevButtonConfig: () => {},
  setName: () => {},
  onAnimStart: () => {},
  onAnimEnd: () => {},
};

export default ScrollAnimSection;
