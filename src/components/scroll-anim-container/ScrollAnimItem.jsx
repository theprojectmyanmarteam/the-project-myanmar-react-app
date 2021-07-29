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
  showNextButton,
  showPrevButton,
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
  const [showNext, setShowNext] = useState(nextButton.show);
  const [showPrev, setShowPrev] = useState(prevButton.show);

  useEffect(() => {
    showNextButton(showNext);
  }, [showNext]);

  useEffect(() => {
    showPrevButton(showPrev);
  }, [showPrev]);

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
          showNext: () => setShowNext(true),
          movePrev,
          showPrev: () => setShowPrev(true),
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
  showNextButton: PropTypes.func,
  showPrevButton: PropTypes.func,
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
  showNextButton: () => {},
  showPrevButton: () => {},
  setName: () => {},
};

export default ScrollAnimItem;
