import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScrollAnimContainer.css';

import { useSpring, animated, config } from 'react-spring';

import Button from 'react-bootstrap/Button';
import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsChevronCompactLeft,
  BsChevronCompactRight,
} from 'react-icons/bs';
import ScrollAnimSection from './ScrollAnimSection';

// const SHOW_BUTTON_DELAY_MS = 800;

const ScrollAnimContainer = ({ children, horizontal, showChild, onChange }) => {
  const [childrenList, setChildrenList] = useState(
    Array.isArray(children) && children.length > 0
      ? children.map((elem, idx) => ({
          id: idx,
          elem,
          position: idx === 0 ? 0 : 1, // first section starts at center, the rest starts in the front
          nextButtonConfig: { show: !(idx === 0), label: '' },
          prevButtonConfig: { show: !(idx === 0), label: '' },
        }))
      : [{ id: 0, elem: children, position: 0 }]
  );
  const [currChildIdx, setCurrChildIdx] = useState(0);
  const [renderNextButton, setRenderNextButton] = useState(false);
  const [renderPrevButton, setRenderPrevButton] = useState(false);
  const [nameToIdxMap, setNameToIdxMap] = useState(new Map());

  // animation for next button
  // -> fade in
  const nextButtonAnim = useSpring({
    opacity: childrenList[currChildIdx].nextButtonConfig.show ? 1 : 0,
    delay: 0,
    config: config.slow,
    display: renderNextButton ? 'flex' : 'none',
    onRest: () => {
      // After the animation is done, if the element is currently not showing,
      // set display of the this section to none
      if (
        !childrenList[currChildIdx].nextButtonConfig.show &&
        renderNextButton
      ) {
        setRenderNextButton(false);
      }
    },
  });

  // animation for prev button
  // -> fade in
  const prevButtonAnim = useSpring({
    opacity: childrenList[currChildIdx].prevButtonConfig.show ? 1 : 0,
    delay: 0,
    config: config.slow,
    display: renderPrevButton ? 'flex' : 'none',
    onRest: () => {
      // After the animation is done, if the element is currently not showing,
      // set display of the this section to none
      if (
        !childrenList[currChildIdx].prevButtonConfig.show &&
        renderPrevButton
      ) {
        setRenderPrevButton(false);
      }
    },
  });

  useEffect(() => {
    if (childrenList[currChildIdx].nextButtonConfig.show) {
      setRenderNextButton(true);
    }
    if (childrenList[currChildIdx].prevButtonConfig.show) {
      setRenderPrevButton(true);
    }
  }, [currChildIdx]);

  const setPositionOfChildAt = (childIdx, pos) => {
    setChildrenList((list) => {
      const newList = list;
      newList[childIdx].position = pos;
      return [...newList];
    });
  };

  const setCurrent = (idx, name) => {
    onChange(name);
    setPositionOfChildAt(idx, 0);
    setCurrChildIdx(idx);
  };

  const moveToChild = (name) => {
    const showChildIdx = nameToIdxMap.get(name);
    if (currChildIdx > showChildIdx) {
      for (let i = showChildIdx + 1; i <= currChildIdx; i += 1) {
        setPositionOfChildAt(i, 1);
      }
    } else if (currChildIdx < showChildIdx) {
      for (let i = showChildIdx - 1; i >= currChildIdx; i -= 1) {
        setPositionOfChildAt(i, -1);
      }
    }
    setCurrent(showChildIdx, name);
  };

  useEffect(() => {
    if (showChild && nameToIdxMap.has(showChild)) {
      if (currChildIdx !== nameToIdxMap.get(showChild)) {
        moveToChild(showChild);
      }
    }
  }, [showChild]);

  const setNextButtonConfigOfChildAt = (childIdx, cfg) => {
    if (cfg.show && childIdx === currChildIdx) {
      setRenderNextButton(true);
    }
    setChildrenList((list) => {
      const newList = list;
      newList[childIdx].nextButtonConfig = cfg;
      return [...newList];
    });
  };

  const setPrevButtonConfigOfChildAt = (childIdx, cfg) => {
    if (cfg.show && childIdx === currChildIdx) {
      setRenderPrevButton(true);
    }
    setChildrenList((list) => {
      const newList = list;
      newList[childIdx].prevButtonConfig = cfg;
      return [...newList];
    });
  };

  const mapNameOfChildAt = (childIdx, name) => {
    setNameToIdxMap((prev) => new Map(prev).set(name, childIdx));
    setChildrenList((prev) => {
      const newList = prev;
      newList[childIdx].name = name;
      return [...newList];
    });
  };

  const movePrev = (currIdx) => {
    if (currIdx - 1 >= 0) {
      setCurrent(currIdx - 1, childrenList[currIdx - 1].name);
      setPositionOfChildAt(currIdx, 1);
    }
  };

  const moveNext = (currIdx) => {
    if (currIdx + 1 < childrenList.length) {
      setCurrent(currIdx + 1, childrenList[currIdx + 1].name);
      setPositionOfChildAt(currIdx, -1);
    }
  };

  return (
    <div className="scroll-anim-container">
      {childrenList.map((child, idx) => {
        return (
          <ScrollAnimSection
            key={child.id}
            item={child.elem}
            onNext={() => {
              moveNext(idx);
            }}
            onPrev={() => {
              movePrev(idx);
            }}
            position={child.position}
            horizontal={horizontal}
            first={idx === 0}
            last={idx === childrenList.length - 1}
            setName={(name) => mapNameOfChildAt(idx, name)}
            setNextButtonConfig={(cfg) =>
              setNextButtonConfigOfChildAt(idx, cfg)
            }
            setPrevButtonConfig={(cfg) =>
              setPrevButtonConfigOfChildAt(idx, cfg)
            }
          />
        );
      })}
      {!horizontal && (
        <animated.div className="up-div" style={prevButtonAnim}>
          <Button
            variant="dark"
            className="nav-button"
            onClick={() => movePrev(currChildIdx)}
          >
            <BsChevronCompactUp size="2em" />
          </Button>
          <p className="up-text">
            {childrenList[currChildIdx].prevButtonConfig.label}
          </p>
        </animated.div>
      )}
      {!horizontal && (
        <animated.div className="down-div" style={nextButtonAnim}>
          <p className="down-text">
            {childrenList[currChildIdx].nextButtonConfig.label}
          </p>
          <Button
            variant="dark"
            className="nav-button"
            onClick={() => moveNext(currChildIdx)}
          >
            <BsChevronCompactDown size="2em" />
          </Button>
        </animated.div>
      )}
      {horizontal && (
        <animated.div className="left-div" style={prevButtonAnim}>
          <Button
            variant="dark"
            className="nav-button"
            onClick={() => movePrev(currChildIdx)}
          >
            <BsChevronCompactLeft size="2em" />
          </Button>
          <div className="left-text">
            {childrenList[currChildIdx].prevButtonConfig.label}
          </div>
        </animated.div>
      )}
      {horizontal && (
        <animated.div className="right-div" style={nextButtonAnim}>
          <div className="right-text">
            {childrenList[currChildIdx].nextButtonConfig.label}
          </div>
          <Button
            variant="dark"
            className="nav-button"
            onClick={() => moveNext(currChildIdx)}
          >
            <BsChevronCompactRight size="2em" />
          </Button>
        </animated.div>
      )}
    </div>
  );
};

ScrollAnimContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  horizontal: PropTypes.bool, // set to true to change orientation to horizontal
  showChild: PropTypes.string, // name of child you want to show
  onChange: PropTypes.func, // callback function on state change
};

ScrollAnimContainer.defaultProps = {
  children: [],
  horizontal: false,
  showChild: '',
  onChange: () => {},
};

export default ScrollAnimContainer;
