import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScrollAnimSection.css';

import { useSpring, animated, config } from 'react-spring';

import ScrollAnimItem from './ScrollAnimItem';

const ScrollAnimSection = ({
  item,
  onNext,
  onPrev,
  visible,
  horizontal,
  first,
  last,
}) => {
  const [showSection, setShowSection] = useState(visible);
  const [renderSection, setRenderSection] = useState(visible);
  const [amount] = useState(horizontal ? 900 : 800);

  // state to control the sections moving up and down
  const [translate, setTranslate] = useState(visible ? 0 : amount);

  const moveSectionPos = () => {
    setTranslate((t) => Math.max(t - amount, -amount));
  };

  const moveSectionNeg = () => {
    setTranslate((t) => Math.min(t + amount, amount));
  };

  // allows parent to show this component by changing to the visible prop
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
    onNext();
    moveSectionPos();
    setShowSection(false);
  };

  const prevSection = () => {
    onPrev();
    moveSectionNeg();
    setShowSection(false);
  };

  // animation that shrinks/exapands this element.
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
    },
  });

  const passedProps = () => {
    const props = {
      moveNext: nextSection,
      movePrev: prevSection,
      horizontal,
      shown: showSection,
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
  visible: PropTypes.bool,
  horizontal: PropTypes.bool, // set true if you want to move horizontntally instead of vertically
  // props to indicate whether the current element is the first/last of the scroll container
  first: PropTypes.bool,
  last: PropTypes.bool,
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
  visible: true,
  horizontal: false,
  first: false,
  last: false,
};

export default ScrollAnimSection;
