import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';
import BounceLoader from 'react-spinners/BounceLoader';
import { useSpring, animated, config } from 'react-spring';

const LoadingSpinner = ({ show }) => {
  const fadeOutAnim = useSpring({
    opacity: show ? 1 : 0,
    config: config.gentle,
  });

  return (
    <animated.div className="loading-spinner" style={fadeOutAnim}>
      <BounceLoader size={80} color="white" />
    </animated.div>
  );
};

LoadingSpinner.propTypes = {
  show: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
  show: true,
};

export default LoadingSpinner;
