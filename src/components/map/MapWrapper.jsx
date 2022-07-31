/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated, config } from 'react-spring';

import Layout from '../layout/Layout';
import Map from './Map';
import MapMobile from './MapMobile';

const MapWrapper = ({ visible, controllers }) => {
  const mapAnim = useSpring({
    opacity: visible ? 1 : 0,
    display: visible ? 'flex' : 'none',
    config: config.slow,
  });
  const reachedSucess = () => {
    controllers.showNext();
  };
  return (
    <Layout
      desktop={<Map reachedSucess={reachedSucess} />}
      mobile={<MapMobile reachedSucess={reachedSucess}/>}
    />
  );
};

MapWrapper.propTypes = {
  controllers: PropTypes.shape({
    onHide: PropTypes.func,
    visible: PropTypes.bool,
    showNext: PropTypes.func,
  }),
};

MapWrapper.defaultProps = {
  onHide: () => {},
  visible: true,
};

export default MapWrapper;
