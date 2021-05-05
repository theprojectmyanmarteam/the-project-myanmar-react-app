import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ScrollAnimContainer.css';
import ScrollAnimSection from './ScrollAnimSection';

const ScrollAnimContainer = ({ children, horizontal }) => {
  const [childrenMap, setChildrenMap] = useState(
    Array.isArray(children)
      ? children.map((elem, idx) => ({ id: idx, elem, show: idx === 0 }))
      : [{ id: 0, elem: children, show: true }]
  );

  const setVisibilityOfChildAt = (childIdx, show) => {
    setChildrenMap((childrenList) => {
      const newList = childrenList;
      newList[childIdx].show = show;
      return [...newList];
    });
  };

  return (
    <div className="scroll-anim-container">
      {childrenMap.map((child, idx) => {
        return (
          <ScrollAnimSection
            key={child.id}
            item={child.elem}
            onNext={() => {
              if (idx + 1 < childrenMap.length) {
                setVisibilityOfChildAt(idx + 1, true);
                setVisibilityOfChildAt(idx, false);
              }
            }}
            onPrev={() => {
              if (idx - 1 >= 0) {
                setVisibilityOfChildAt(idx - 1, true);
                setVisibilityOfChildAt(idx, false);
              }
            }}
            visible={child.show}
            horizontal={horizontal}
            first={idx === 0}
            last={idx === childrenMap.length - 1}
          />
        );
      })}
    </div>
  );
};

ScrollAnimContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  horizontal: PropTypes.bool, // set to true to change orientation to horizontal
};

ScrollAnimContainer.defaultProps = {
  children: [],
  horizontal: false,
};
export default ScrollAnimContainer;
