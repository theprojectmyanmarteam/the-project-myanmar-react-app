import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ScrollAnimItem.css';

// const SHOW_BUTTON_DELAY_MS = 800;

const ScrollAnimItem = ({
  content,
  nextButton,
  prevButton,
  moveNext,
  movePrev,
  horizontal,
  shown,
  setNextButtonConfig,
  setPrevButtonConfig,
  setName,
  name,
}) => {
  const [nextScrollEnabled, setNextScrollEnabled] = useState(
    nextButton.scrollable
  );
  // eslint-disable-next-line no-unused-vars
  const [prevScrollEnabled, setPrevScrollEnabled] = useState(
    prevButton.scrollable
  );
  const [nextConfig, setNextConfig] = useState(nextButton);
  const [prevConfig, setPrevConfig] = useState(prevButton);

  useEffect(() => {
    setNextButtonConfig(nextConfig);
  }, [nextConfig]);

  useEffect(() => {
    setPrevButtonConfig(prevConfig);
  }, [prevConfig]);

  useEffect(() => {
    if (name) {
      setName(name);
    }
  }, []);

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
    /*
    // allow to scroll back to the top; not allowing left scroll
    else if (prevScrollEnabled && !horizontal) {
      movePrev();
    }
    */
  };

  return (
    <div className="scroll-anim-item" onWheel={onPageScroll}>
      {React.cloneElement(content, {
        controllers: {
          enableScroll: () => setNextScrollEnabled(true),
          moveNext,
          showNext: () => setNextConfig({ ...nextConfig, ...{ show: true } }),
          movePrev,
          showPrev: () => setPrevConfig({ ...prevConfig, ...{ show: true } }),
        },
        shown,
      })}
    </div>
  );
};

ScrollAnimItem.propTypes = {
  content: PropTypes.element,
  name: PropTypes.string, // name of this item
  nextButton: PropTypes.shape({
    show: PropTypes.bool, // set to false to hide this button
    label: PropTypes.string, // put a label next to the button
    scrollable: PropTypes.bool, // can be triggered by scroll
    onClick: PropTypes.func,
  }),
  prevButton: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string,
    scrollable: PropTypes.bool,
    onClick: PropTypes.func,
  }),
  moveNext: PropTypes.func,
  movePrev: PropTypes.func,
  horizontal: PropTypes.bool, // orientation of the buttons
  shown: PropTypes.bool, // true if this current element is shown
  setNextButtonConfig: PropTypes.func,
  setPrevButtonConfig: PropTypes.func,
  setName: PropTypes.func,
};

ScrollAnimItem.defaultProps = {
  content: (
    <div>
      {' '}
      <p>This is a section</p>{' '}
    </div>
  ),
  name: '',
  nextButton: {
    show: true,
    label: '',
    scrollable: false,
    onClick: () => {},
  },
  prevButton: {
    show: true,
    label: '',
    scrollable: false,
    onClick: () => {},
  },
  moveNext: () => {},
  movePrev: () => {},
  horizontal: false,
  shown: false,
  setNextButtonConfig: () => {},
  setPrevButtonConfig: () => {},
  setName: () => {},
};

export default ScrollAnimItem;
